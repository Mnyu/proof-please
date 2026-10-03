import { config } from '@/config';
import { JobStatus } from '@/constants';
import { redis } from '@/lib/redis';
import { log } from '@/observability/logger';
import { updateFactCheckJobStatus } from '@/repository';
import { FactCheckJob } from '@/types/types';
import { Worker } from 'bullmq';

const worker = new Worker<FactCheckJob>(
  config.factCheckJobQueue.name,
  async (job) => {
    const { userId, reelUrl } = job.data;
    log.info(`Processing ${job.id} for user ${userId}`);

    //TODO : FUNCTION TO RUN PIPELINE
    const jobId = job.id;
    if (!jobId) {
      throw new Error('no job id present');
    }
    await updateFactCheckJobStatus(jobId, JobStatus.IN_PROGRESS);

    log.info(`Completed ${job.id}`);
    throw new Error('testing');
    // return { success: true };
    return { success: false };
  },
  {
    connection: redis,
    concurrency: config.factCheckJobQueue.concurrency, // Number of fact checks running simultaneously
  },
);

worker.on('ready', () => {
  log.info('Fact-check worker is ready');
});

worker.on('completed', async (job, result) => {
  const jobId = job.id;
  if (!jobId) {
    throw new Error('no job id present');
  }
  await updateFactCheckJobStatus(jobId, JobStatus.COMPLETED);
  log.info({ jobId: job.id, result }, 'Fact-check job completed');
});

worker.on('failed', async (job, error) => {
  if (!job) {
    throw new Error('no job present');
  }
  const jobId = job.id;
  if (!jobId) {
    throw new Error('no job id present');
  }
  await updateFactCheckJobStatus(jobId, JobStatus.FAILED);
  log.error({ jobId: job?.id, error }, 'Fact-check job failed');
});

worker.on('error', (error) => {
  log.error({ error }, 'Fact-check worker error');
});

worker.on('stalled', (jobId) => {
  log.warn({ jobId }, 'Fact-check job stalled');
});

export { worker };
