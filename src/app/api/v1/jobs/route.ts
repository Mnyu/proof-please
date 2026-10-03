import { log } from '@/observability/logger';
import { submitFactCheckJob } from '@/service/job.service';
import { apiError, apiSuccess, FactCheckRequestSchema } from '@/types/api';

const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const parsed = FactCheckRequestSchema.safeParse(body);
    if (!parsed.success) {
      // const validationErrors = flattenError(parsed.error).fieldErrors;
      throw new Error('request validation failed');
    }
    const response = await submitFactCheckJob(parsed.data.userId, parsed.data.reelUrl);
    if (response.rateLimitExceeded) {
      return apiError(`rate limited succeeded, retry after ${response.retryAfter} seconds`, 429);
    }
    return apiSuccess('request submitted successfully', response, 200);
  } catch (error) {
    log.error(error);
    return apiError('unable to process requests currently', 500);
  }
};

export { POST };
