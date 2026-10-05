import { AppError } from '@/errors';
import { log } from '@/observability/logger';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const apiSuccess = <T>(message: string, data: T, status: number): NextResponse => {
  return NextResponse.json({ message: message, data }, { status: status });
};

export const apiError = (error: AppError): NextResponse => {
  log.error(error);
  return NextResponse.json(
    { error: error.message, details: error.details ? error.details : '' },
    { status: error.status },
  );
};

export const FactCheckRequestSchema = z.object({
  // userId: z.string().nonempty(),
  reelUrl: z.string().nonempty(),
});
export type FactCheckRequest = z.infer<typeof FactCheckRequestSchema>;

export const FactCheckResponseSchema = z.object({
  jobId: z.string(),
  jobStatus: z.string(),
  requestsRemaining: z.number(),
});
export type FactCheckResponse = z.infer<typeof FactCheckResponseSchema>;

export const JobsListFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(1000).default(10),
  sort: z.enum(['createdAt', 'symbol', 'entryDate', 'exitDate']).default('createdAt'),
  direction: z.enum(['asc', 'desc']).default('desc'),
});
export type JobsListFilters = z.infer<typeof JobsListFiltersSchema>;
