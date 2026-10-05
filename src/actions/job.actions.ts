'use server';

import { AppError, InternalError, ValidationError } from '@/errors';
import { log } from '@/observability/logger';
import { submitFactCheckJob } from '@/service';
import { actionFailure, ActionResponse, actionSuccess } from '@/types/actionResponse';
import { FactCheckRequestSchema, FactCheckResponse } from '@/types/api';
import { flattenError } from 'zod';

const submitProofPleaseJob = async (input: unknown): Promise<ActionResponse<FactCheckResponse>> => {
  try {
    console.log(input);
    const parsed = FactCheckRequestSchema.safeParse(input);
    if (!parsed.success) {
      throw new ValidationError('Input validation failed', flattenError(parsed.error).fieldErrors);
    }
    const factCheckRequest = parsed.data;
    return actionSuccess(await submitFactCheckJob(factCheckRequest));
  } catch (error) {
    log.error(error);
    if (error instanceof AppError) {
      return actionFailure(error);
    }
    return actionFailure(new InternalError('something went wrong'));
  }
};

export { submitProofPleaseJob };
