import { config } from '@/config';
import { factCheckJobQueue } from '@/queue';
import { checkFactCheckJobUserRateLimit } from '@/rateLimit';
import { FactCheckResponse } from '@/types/api';
import { createSHA256Hash } from '@/utils';

const submitFactCheckJob = async (userId: string, reelUrl: string): Promise<FactCheckResponse> => {
  const rateLimit = await checkFactCheckJobUserRateLimit(userId);
  if (!rateLimit.allowed) {
    return {
      jobId: '',
      jobStatus: '',
      requestsRemaining: 0,
      rateLimitExceeded: true,
      retryAfter: rateLimit.retryAfter,
    };
  }
  const job = await factCheckJobQueue.add(
    config.factCheckJobQueue.jobName,
    { userId, reelUrl },
    { jobId: createSHA256Hash(`${userId}:${reelUrl}`) },
  );

  return {
    jobId: job.id || '',
    jobStatus: 'QUEUED',
    requestsRemaining: rateLimit.remaining,
    rateLimitExceeded: false,
  };
};

export { submitFactCheckJob };
