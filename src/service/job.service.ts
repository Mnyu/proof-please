import { getExtractorAgent } from '@/agent/extractor/factory';
import { config } from '@/config';
import { AppError, RateLimitError } from '@/errors';
import { requireSession } from '@/lib/auth-session';
import { log } from '@/observability/logger';
import { factCheckJobQueue } from '@/queue';
import { checkFactCheckJobUserRateLimit } from '@/rateLimit';
import { saveFactCheckJob } from '@/repository';
import { FactCheckResponse } from '@/types/api';
import {
  ClaimedFact,
  ClaimedFactWithVerifiableSources,
  ExtractorResponse,
  VerifierResponse,
  VideoDetails,
} from '@/types/types';
import { createSHA256Hash } from '@/utils';
import { getTrialRun, getVideoDetails } from '@/video';
import { HumanMessage } from 'langchain';
import { getVerifiableSources } from './fact.service';
import { getVerifierAgent } from '@/agent/verifier/factory';

const submitFactCheckJob = async (userId: string, reelUrl: string): Promise<FactCheckResponse> => {
  // TODO : get userId from session instead of userId parameter
  // const { user } = await requireSession();
  const rateLimit = await checkFactCheckJobUserRateLimit(userId);
  if (!rateLimit.allowed) {
    throw new RateLimitError(`rate limited exceeded, retry after ${rateLimit.retryAfter} seconds`);
  }
  const jobId = createSHA256Hash(`${userId}:${reelUrl}`);
  const factCheckJob = await saveFactCheckJob({ id: jobId, userId: userId, reelUrl: reelUrl });
  const job = await factCheckJobQueue.add(
    config.factCheckJobQueue.jobName,
    { userId: factCheckJob.userId, reelUrl: factCheckJob.reelUrl },
    { jobId: factCheckJob.id },
  );
  return {
    jobId: factCheckJob.id,
    jobStatus: factCheckJob.status,
    requestsRemaining: rateLimit.remaining,
  };
};

const runFactCheckJob = async (reelUrl: string) => {
  log.info(`running fact check job for : ${reelUrl}`);
  // const videoDetails = await getVideoDetails(reelUrl);
  const videoDetails = getTrialRun();
  const claimedFacts = await extractClaimedFacts(videoDetails);
  const claimedFactsWithVerifiableSourcesPromises = await Promise.allSettled(
    claimedFacts.map((claimedFact) => getClaimedFactsWithVerifiableSources(claimedFact)),
  );
  const claimedFactsWithVerifiableSources = claimedFactsWithVerifiableSourcesPromises
    .filter((promise) => promise.status === 'fulfilled')
    .map((promise) => promise.value);
  const response = verifiyClaimedFacts(claimedFactsWithVerifiableSources);
  return response;
};

const extractClaimedFacts = async (videoDetails: VideoDetails) => {
  const extractorAgent = await getExtractorAgent();
  const query = videoDetails.transcript;
  const response = await extractorAgent.invoke({ messages: new HumanMessage(query) });
  const extractorResponse: ExtractorResponse = response.structuredResponse;
  let claimedFacts = extractorResponse.claimedFacts;
  log.info(`no of claimed facts extracted : ${claimedFacts.length}`);
  if (!claimedFacts || claimedFacts.length < 1) {
    //TODO : see what to return here
    throw new AppError('No claimedFacts');
  }
  if (claimedFacts.length > config.extractor.maxClaimedFacts) {
    claimedFacts = claimedFacts.slice(0, config.extractor.maxClaimedFacts + 1);
  }
  return claimedFacts;
};

const getClaimedFactsWithVerifiableSources = async (
  claimedFact: ClaimedFact,
): Promise<ClaimedFactWithVerifiableSources> => {
  const verifiableSources = await getVerifiableSources(claimedFact.fact, claimedFact.searchQueries);
  return {
    claimedFact: claimedFact.fact,
    searchQueries: claimedFact.searchQueries,
    verifiableSources: verifiableSources,
  };
};

const verifiyClaimedFacts = async (claimedFactsWithVerifiableSources: ClaimedFactWithVerifiableSources[]) => {
  if (!claimedFactsWithVerifiableSources || claimedFactsWithVerifiableSources.length < 1) {
    //TODO : instead of error - some response has to be returned here
    throw new Error('No claimedFactsWithVerifiableSources');
  }
  const verifierAgent = await getVerifierAgent();
  const query = buildVerificationQuery(claimedFactsWithVerifiableSources);
  const response = await verifierAgent.invoke({ messages: new HumanMessage(query) });
  const verifierResponse: VerifierResponse = response.structuredResponse;
  return verifierResponse;
};

const buildVerificationQuery = (claimedFactsWithVerifiableSources: ClaimedFactWithVerifiableSources[]) => {
  let userQuery = `****************************
  `;
  for (let i = 1; i <= claimedFactsWithVerifiableSources.length; i++) {
    const claimedFactWithVerifiableSources = claimedFactsWithVerifiableSources[i - 1];
    userQuery = userQuery + `\n Claimed Fact : ${claimedFactWithVerifiableSources.claimedFact}`;
    if (
      claimedFactWithVerifiableSources.verifiableSources &&
      claimedFactWithVerifiableSources.verifiableSources.length > 0
    ) {
      for (let j = 1; j <= claimedFactWithVerifiableSources.verifiableSources.length; j++) {
        const source = claimedFactWithVerifiableSources.verifiableSources[j - 1];
        userQuery =
          userQuery +
          `\n Source: ${source.url}, Type: ${source.source}, Url: ${source.url}Date: ${source.date || 'Date not available'}  Relation with claimed fact : ${source.relation.choice} with confidence score: ${source.relation.confidence} Title: ${source.title || 'No Title'} Text: ${source.text}  `;
      }
    }
    userQuery =
      userQuery +
      `
    ****************************
    `;
  }
  userQuery =
    userQuery +
    `\n Return factResults in response for total ${claimedFactsWithVerifiableSources.length} claimed facts.`;
  return userQuery;
};

export { submitFactCheckJob, runFactCheckJob };
