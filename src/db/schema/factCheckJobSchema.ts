import { pgEnum, pgTable, text, smallint, jsonb, timestamp, index, char } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from './authSchema';
import { JobStatus } from '@/constants';

export const factCheckJobStatus = pgEnum('fact_check_job_status', [
  JobStatus.QUEUED,
  JobStatus.IN_PROGRESS,
  JobStatus.COMPLETED,
  JobStatus.FAILED,
]);

export const factCheckJob = pgTable(
  'fact_check_job',
  {
    id: char('id', { length: 64 }).primaryKey(),
    userId: text('user_id')
      .references(() => user.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    reelUrl: text('reel_url').notNull(),
    status: factCheckJobStatus('status').notNull().default(JobStatus.QUEUED),
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

export const factCheckJobRelations = relations(factCheckJob, ({ one }) => ({
  user: one(user, {
    fields: [factCheckJob.userId],
    references: [user.id],
  }),
}));

export type FactCheckJob = typeof factCheckJob.$inferSelect;
export type NewFactCheckJob = typeof factCheckJob.$inferInsert;
