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

const findFactCheckJob = async (jobId: string) => {
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

const findUserStats = async (userId: string) => {
  const [stats] = await db
    .select({
      totalSubmitted: sql<number>`count(*)::int`,
      trueCount: sql<number>`count(*) filter (where ${factCheckJob.verdict} = 'TRUE')::int`,
      truePercentage: sql<number>`
        round(
          count(*) filter (where ${factCheckJob.verdict} = 'TRUE') * 100.0
          / nullif(count(*), 0),
          2
        )`,
      falseCount: sql<number>`
        count(*) filter (where ${factCheckJob.verdict} = 'FALSE')::int`,
      falsePercentage: sql<number>`
        round(
          count(*) filter (where ${factCheckJob.verdict} = 'FALSE') * 100.0
          / nullif(count(*), 0),
          2
        )`,
      partiallyTrueCount: sql<number>`
        count(*) filter (where ${factCheckJob.verdict} = 'PARTIALLY_TRUE')::int`,
      partiallyTruePercentage: sql<number>`
        round(
          count(*) filter (where ${factCheckJob.verdict} = 'PARTIALLY_TRUE') * 100.0
          / nullif(count(*), 0),
          2
        )`,
      misleadingCount: sql<number>`count(*) filter (where ${factCheckJob.verdict} = 'MISLEADING')::int`,
      misleadingPercentage: sql<number>`
        round(
          count(*) filter (where ${factCheckJob.verdict} = 'MISLEADING') * 100.0
          / nullif(count(*), 0),
          2
        )`,
      unverifiableCount: sql<number>`count(*) filter (where ${factCheckJob.verdict} = 'UNVERIFIABLE')::int`,
      unverifiablePercentage: sql<number>`
        round(
          count(*) filter (where ${factCheckJob.verdict} = 'UNVERIFIABLE') * 100.0
          / nullif(count(*), 0),
          2
        )`,
      outdatedCount: sql<number>`count(*) filter (where ${factCheckJob.verdict} = 'OUTDATED')::int`,
      outdatedPercentage: sql<number>`
      round(
        count(*) filter (where ${factCheckJob.verdict} = 'OUTDATED') * 100.0
        / nullif(count(*), 0),
        2
      )`,
      satireCount: sql<number>`
        count(*) filter (where ${factCheckJob.verdict} = 'SATIRE')::int`,
      satirePercentage: sql<number>`
        round(
          count(*) filter (where ${factCheckJob.verdict} = 'SATIRE') * 100.0
          / nullif(count(*), 0),
          2
        )`,
    })
    .from(factCheckJob)
    .where(eq(factCheckJob.userId, userId));
  return stats;
};

export { findFactCheckJobs, findFactCheckJob, saveFactCheckJob, updateFactCheckJob, findUserStats };
