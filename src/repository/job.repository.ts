import { db } from '@/db/client';
import { factCheckJob, FactCheckJob, NewFactCheckJob } from '@/db/schema';
import { eq } from 'drizzle-orm';

const getFactCheckJob = async (jobId: string) => {
  const [job] = await db.select().from(factCheckJob).where(eq(factCheckJob.id, jobId)).limit(1);
  return job;
};

const saveFactCheckJob = async (newFactCheckJob: NewFactCheckJob): Promise<FactCheckJob> => {
  const [savedFactCheckJob] = await db.insert(factCheckJob).values(newFactCheckJob).onConflictDoNothing().returning();
  return savedFactCheckJob;
};

const updateFactCheckJob = async (jobId: string, data: Partial<NewFactCheckJob>) => {
  const [updatedJob] = await db.update(factCheckJob).set(data).where(eq(factCheckJob.id, jobId)).returning();
  return updatedJob;
};

export { getFactCheckJob, saveFactCheckJob, updateFactCheckJob };
