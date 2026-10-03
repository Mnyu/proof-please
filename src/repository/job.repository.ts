import { JobStatus } from '@/constants';
import { db } from '@/db/client';
import { factCheckJob, FactCheckJob, NewFactCheckJob } from '@/db/schema';
import { eq } from 'drizzle-orm';

const saveFactCheckJob = async (newFactCheckJob: NewFactCheckJob): Promise<FactCheckJob> => {
  const [savedFactCheckJob] = await db.insert(factCheckJob).values(newFactCheckJob).onConflictDoNothing().returning();
  return savedFactCheckJob;
};

const updateFactCheckJobStatus = async (jobId: string, status: JobStatus) => {
  const [updatedFactCheckJob] = await db
    .update(factCheckJob)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(factCheckJob.id, jobId))
    .returning();
  return updatedFactCheckJob;
};

export { saveFactCheckJob, updateFactCheckJobStatus };
