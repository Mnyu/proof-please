import { config } from '@/config';
import { redis } from '@/lib/redis';
import { FactCheckJob } from '@/types/types';
import { Queue } from 'bullmq';

const factCheckJobQueue = new Queue<FactCheckJob>(config.factCheckJobQueue.name, {
  connection: redis,
  defaultJobOptions: {
    attempts: config.factCheckJobQueue.retryAttempts,

    backoff: {
      type: config.factCheckJobQueue.backOffType,
      delay: config.factCheckJobQueue.backOffDelayMilliseconds,
    },

    removeOnComplete: {
      age: 60 * 60, // keep completed jobs for 1 hour
      count: 1000,
    },

    removeOnFail: {
      // age: 24 * 60 * 60, // keep failed jobs for 24 hours
      age: 60 * 60, // keep failed jobs for 1 hour
    },
  },
});

export { factCheckJobQueue };
