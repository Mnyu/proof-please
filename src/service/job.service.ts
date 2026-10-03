import { config } from '@/config';
import { factCheckJobQueue } from '@/queue';
import { checkFactCheckJobUserRateLimit } from '@/rateLimit';
import { createSHA256Hash } from '@/utils';

const submitFactCheckJob = async (userId: string, reelUrl: string) => {
  const rateLimit = await checkFactCheckJobUserRateLimit(userId);
  if (!rateLimit.allowed) {
    return {
      status: 429,
      body: {
        error: 'RATE_LIMIT_EXCEEDED',
        retryAfter: rateLimit.retryAfter,
      },
    };
  }
  const job = await factCheckJobQueue.add(
    config.factCheckJobQueue.jobName,
    { userId, reelUrl },
    { jobId: createSHA256Hash(`${userId}:${reelUrl}`) },
  );

  return {
    status: 202,
    body: {
      jobId: job.id,
      status: 'QUEUED',
      remainingRequests: rateLimit.remaining,
    },
  };
};

export { submitFactCheckJob };
