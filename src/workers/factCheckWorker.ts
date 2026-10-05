import { config } from '@/config';
import { JobStatus } from '@/constants';
import { redis } from '@/lib/redis';
import { log } from '@/observability/logger';
import { updateFactCheckJob } from '@/repository';
import { runFactCheckJob } from '@/service';
import { FactCheckJob } from '@/types/types';
import { getDurationInMs } from '@/utils';
import { Job, Worker } from 'bullmq';

const processor = async (job: Job) => {
  const startTime = performance.now();
  const { userId, reelUrl } = job.data;
  const jobId = job.id;
  if (!jobId) {
    throw new Error('no job id found to process');
  }
  log.info(`Started processing fact-chek job: ${jobId}`);
  try {
    await updateFactCheckJob(jobId, { status: JobStatus.IN_PROGRESS });
    const { verifierResponse, videoDetails } = await runFactCheckJob(reelUrl);
    log.info(`Response for fact-chek job: ${jobId}`);
    log.info(JSON.stringify(verifierResponse, null, 2));

    await updateFactCheckJob(jobId, {
      reelCaption: videoDetails.caption,
      status: JobStatus.COMPLETED,
      verdict: verifierResponse.verdict,
      result: verifierResponse,
      processingDurationMs: getDurationInMs(startTime),
    });
    log.info(`Completed processing fact-chek job: ${jobId}`);
  } catch (error) {
    let errorMsg = 'unkown error';
    if (error instanceof Error) {
      errorMsg = error.message;
    }
    await updateFactCheckJob(jobId, {
      reelCaption: reelUrl,
      status: JobStatus.FAILED,
      processingDurationMs: getDurationInMs(startTime),
      error: errorMsg,
    });
    throw error;
  }
};

const workerOptions = {
  connection: redis,
  concurrency: config.factCheckJobQueue.concurrency, // Number of fact checks running simultaneously
};

/* creates a long-running process that stays alive 
and continuously listens to the queue and executes jobs from it.
*/
const worker = new Worker<FactCheckJob>(config.factCheckJobQueue.name, processor, workerOptions);

/* Worker events : 
    ready & error = worker level events
    completed, failed and stalled = job level events
*/
worker.on('ready', () => {
  // called when the worker has successfully initialized and is ready to process jobs
  log.info('Fact-check worker is ready');
});

worker.on('error', (error) => {
  log.error('Fact-check worker error', error);
});

worker.on('completed', async (job, result) => {
  // called whenever the worker successfully finishes a job.
  log.info(`Completed fact-check job: ${job.id}`);
});

worker.on('failed', async (job, error) => {
  // called when a job fails because the processor throws/rejects.
  if (job) {
    log.error(`Failure in fact-check job: ${job.id}`);
  }
  log.error(error);
});

worker.on('stalled', (jobId) => {
  // called when bullmq thinks a job was being processed by a worker, but that worker stopped renewing the job's lock
  log.warn(`Stalled fact-check job: ${jobId}`);
});

export { worker };
