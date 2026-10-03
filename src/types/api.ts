import { log } from '@/observability/logger';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const apiSuccess = <T>(message: string, data: T, status: number): NextResponse => {
  return NextResponse.json({ message: message, data }, { status: status });
};

export const apiError = (errorMessage: string, status: number): NextResponse => {
  log.error(errorMessage);
  return NextResponse.json({ error: errorMessage }, { status: status });
};

export const FactCheckRequestSchema = z.object({
  userId: z.string().nonempty(),
  reelUrl: z.string().nonempty(),
});
export type FactCheckRequest = z.infer<typeof FactCheckRequestSchema>;

export const FactCheckResponseSchema = z.object({
  jobId: z.string(),
  jobStatus: z.string(),
  requestsRemaining: z.number(),
  rateLimitExceeded: z.boolean().default(false),
  retryAfter: z.number().optional(),
});
export type FactCheckResponse = z.infer<typeof FactCheckResponseSchema>;
