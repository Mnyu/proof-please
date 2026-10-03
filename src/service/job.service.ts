import { config } from '@/config';
import { RateLimitError } from '@/errors';
import { requireSession } from '@/lib/auth-session';
import { factCheckJobQueue } from '@/queue';
import { checkFactCheckJobUserRateLimit } from '@/rateLimit';
import { saveFactCheckJob } from '@/repository';
import { FactCheckResponse } from '@/types/api';
import { createSHA256Hash } from '@/utils';

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

export { submitFactCheckJob };
