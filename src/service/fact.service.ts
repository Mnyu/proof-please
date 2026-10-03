import { analyse } from '@/agent/analyst';
import { SAYS_NOTHING } from '@/constants';
import {
  retrieveFromGoogleFactCheck,
  retrieveFromNewsApi,
  retrieveFromNewsDataIo,
  retrieveFromSnopesFactCheck,
  retrieveFromWeb,
} from '@/retrievers';
import { RetrieverRequest, RetrieverResponse, SearchQueries } from '@/types/types';

const getVerifiableSources = async (claimedFact: string, searchQueries: SearchQueries) => {
  const googleFactCheckRequest = buildRetrieverRequest(claimedFact, searchQueries.factCheckWebSearch);
  const snopesFactCheckRequest = buildRetrieverRequest(claimedFact, searchQueries.factCheckWebSearch);
  const newsRequest = buildRetrieverRequest(claimedFact, searchQueries.newsWebSearch);
  const webRequest = buildRetrieverRequest(claimedFact, searchQueries.webSearch);

  const [googleFactCheckPromise, snopesFactCheckPromise, newsApiPromise, newsDataIoPromise, webPromise] =
    await Promise.allSettled([
      retrieveAnalysedSources(retrieveFromGoogleFactCheck, googleFactCheckRequest),
      retrieveAnalysedSources(retrieveFromSnopesFactCheck, snopesFactCheckRequest),
      retrieveAnalysedSources(retrieveFromNewsApi, newsRequest),
      retrieveAnalysedSources(retrieveFromNewsDataIo, newsRequest),
      retrieveAnalysedSources(retrieveFromWeb, webRequest),
    ]);

  const googleFactCheckSources = googleFactCheckPromise.status === 'fulfilled' ? googleFactCheckPromise.value : [];
  const snopesFactCheckSources = snopesFactCheckPromise.status === 'fulfilled' ? snopesFactCheckPromise.value : [];
  const newsApiSources = newsApiPromise.status === 'fulfilled' ? newsApiPromise.value : [];
  const newsDataIoSources = newsDataIoPromise.status === 'fulfilled' ? newsDataIoPromise.value : [];
  const webSources = webPromise.status === 'fulfilled' ? webPromise.value : [];

  const allSources = [
    ...googleFactCheckSources,
    ...snopesFactCheckSources,
    ...newsApiSources,
    ...newsDataIoSources,
    ...webSources,
  ];

  const verifiableSources = allSources.filter((source) => source.relation.choice !== SAYS_NOTHING);
  return verifiableSources;
};

const retrieveAnalysedSources = async (
  retrieveSources: (request: RetrieverRequest) => Promise<RetrieverResponse>,
  request: RetrieverRequest,
) => {
  const retrievalResponse = await retrieveSources(request);
  return analyse(retrievalResponse);
};

const buildRetrieverRequest = (claimedFact: string, searchQuery: string): RetrieverRequest => {
  return {
    fact: claimedFact,
    searchQuery: searchQuery,
  };
};

export { getVerifiableSources };
