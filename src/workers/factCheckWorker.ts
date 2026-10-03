import { config } from '@/config';
import { redis } from '@/lib/redis';
import { log } from '@/observability/logger';
import { FactCheckJob } from '@/types/types';
import { Worker } from 'bullmq';

const worker = new Worker<FactCheckJob>(
  config.factCheckJobQueue.name,
  async (job) => {
    const { userId, reelUrl } = job.data;
    log.info(`Processing ${job.id} for user ${userId}`);
    //TODO : FUNCTION TO RUN PIPELINE
    log.info(`Completed ${job.id}`);
    return { success: true };
  },
  {
    connection: redis,
    concurrency: config.factCheckJobQueue.concurrency, // Number of fact checks running simultaneously
  },
);

worker.on('ready', () => {
  log.info('Fact-check worker is ready');
});

worker.on('completed', (job, result) => {
  log.info({ jobId: job.id, result }, 'Fact-check job completed');
});

worker.on('failed', (job, error) => {
  log.error({ jobId: job?.id, error }, 'Fact-check job failed');
});

worker.on('error', (error) => {
  log.error({ error }, 'Fact-check worker error');
});

worker.on('stalled', (jobId) => {
  log.warn({ jobId }, 'Fact-check job stalled');
});

export { worker };
