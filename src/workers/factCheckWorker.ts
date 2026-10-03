import { config } from '@/config';
import { JobStatus } from '@/constants';
import { redis } from '@/lib/redis';
import { log } from '@/observability/logger';
import { updateFactCheckJobResultAndStatus, updateFactCheckJobStatus } from '@/repository';
import { runFactCheckJob } from '@/service';
import { FactCheckJob } from '@/types/types';
import { Worker } from 'bullmq';

const worker = new Worker<FactCheckJob>(
  config.factCheckJobQueue.name,
  async (job) => {
    //TODO : handle this function and its code properly
    const { userId, reelUrl } = job.data;
    const jobId = job.id;
    if (!jobId) {
      throw new Error('no job id present');
    }
    log.info(`Processing ${job.id} for user ${userId}`);

    await updateFactCheckJobStatus(jobId, JobStatus.IN_PROGRESS);

    const response = await runFactCheckJob(reelUrl);
    log.info(JSON.stringify(response, null, 2));

    await updateFactCheckJobResultAndStatus(jobId, response, JobStatus.COMPLETED);

    log.info(`Completed ${job.id}`);
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
  // const jobId = job.id;
  // if (!jobId) {
  //   throw new Error('no job id present');
  // }
  // await updateFactCheckJobStatus(jobId, JobStatus.COMPLETED);
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
