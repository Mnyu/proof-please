import { pgEnum, pgTable, uuid, text, smallint, jsonb, timestamp, index } from 'drizzle-orm/pg-core';

export const factCheckJobStatus = pgEnum('fact_check_job_status', ['QUEUED', 'IN_PROGRESS', 'COMPLETED', 'FAILED']);

export const factCheckJobs = pgTable(
  'fact_check_jobs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull(),
    reelUrl: text('reel_url').notNull(),
    status: factCheckJobStatus('status').notNull().default('QUEUED'),
    progress: smallint('progress').notNull().default(0),
    error: text('error'),
    result: jsonb('result'),
    startedAt: timestamp('started_at', {
      withTimezone: true,
      mode: 'date',
    }),
    completedAt: timestamp('completed_at', {
      withTimezone: true,
      mode: 'date',
    }),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'date',
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'date',
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('fact_check_jobs_user_id_idx').on(table.userId),
    index('fact_check_jobs_status_idx').on(table.status),
    index('fact_check_jobs_user_created_idx').on(table.userId, table.createdAt),
  ],
);
