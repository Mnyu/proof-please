import { db } from '@/db/client';
import { factCheckJob, FactCheckJob, NewFactCheckJob } from '@/db/schema';
import { JobsListFilters } from '@/types/api';
import { and, desc, eq, sql } from 'drizzle-orm';

const findFactCheckJobs = async (userId: string, filters: JobsListFilters) => {
  const conditions = [eq(factCheckJob.userId, userId)];
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
  const offset = (filters.page - 1) * filters.pageSize;
  const [rows, countResult] = await Promise.all([
    db
      .select()
      .from(factCheckJob)
      .where(whereClause)
      .orderBy(desc(factCheckJob.createdAt))
      .limit(filters.pageSize)
      .offset(offset),

    db
      .select({
        total: sql<number>`count(*)`,
      })
      .from(factCheckJob)
      .where(whereClause),
  ]);

  return {
    rows,
    total: Number(countResult[0]?.total ?? 0),
  };
};

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

export { findFactCheckJobs, getFactCheckJob, saveFactCheckJob, updateFactCheckJob };
