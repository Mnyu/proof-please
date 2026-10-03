import { AppError, InternalError } from '@/errors';
import { submitFactCheckJob } from '@/service';
import { apiError, apiSuccess, FactCheckRequestSchema } from '@/types/api';

const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const parsed = FactCheckRequestSchema.safeParse(body);
    if (!parsed.success) {
      // const validationErrors = flattenError(parsed.error).fieldErrors;
      throw new Error('Request validation failed');
    }
    const response = await submitFactCheckJob(parsed.data.userId, parsed.data.reelUrl);
    return apiSuccess('Request submitted successfully', response, 200);
  } catch (error) {
    if (error instanceof AppError) {
      return apiError(error);
    }
    const internalError = new InternalError('Unable to process requests currently');
    internalError.cause = error;
    return apiError(internalError);
  }
};

export { POST };
