import { config } from '@/config';
import { GOOGLE_FACT_CHECK } from '@/constants';
import { log } from '@/observability/logger';
import { RetrieverRequest, RetrieverResults } from '@/types/types';
import { z } from 'zod';

const ClaimReviewSchema = z.object({
  url: z.string(),
  title: z.string(),
  reviewDate: z.string(),
  textualRating: z.string(),
});

const ClaimSchema = z.object({
  text: z.string(),
  claimReviews: z.array(ClaimReviewSchema),
});

const ClaimsResponseSchema = z.object({
  claims: z.array(ClaimSchema),
});
type ClaimsResponse = z.infer<typeof ClaimsResponseSchema>;

const retrieve = async (request: RetrieverRequest): Promise<RetrieverResults> => {
  const results: RetrieverResults = [];
  try {
    const params = new URLSearchParams({
      query: request.searchQuery,
      languageCode: 'en',
      pageSize: String(config.googleFactCheck.pageSize),
      key: process.env.APIFY_TOKEN!,
    });
    const response = await fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?${params}`);
    const claimsResponse: ClaimsResponse = await response.json();
    const claims = claimsResponse.claims;
    if (!claims || claims.length === 0) {
      log.warn('either google fact check claims do not exist or claims are empty');
      return results;
    }

    for (const claim of claims) {
      if (results.length >= config.googleFactCheck.maxResults) {
        break;
      }
      if (claim.claimReviews && claim.claimReviews.length > 0) {
        const claimReview = claim.claimReviews[0];
        results.push({
          source: GOOGLE_FACT_CHECK,
          sourceRelevance: 0.1,
          title: claimReview.title,
          text: claim.text,
          url: claimReview.url,
          date: claimReview.reviewDate,
          textualRating: claimReview.textualRating,
        });
      }
    }
  } catch (error) {
    log.error('error getting google fact check claims');
    log.error(error);
  }
  log.info(`google fact checker returned ${results.length} results`);
  return results;
};

export { retrieve };
