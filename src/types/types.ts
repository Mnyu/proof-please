import { GOOGLE_FACT_CHECK, NEWS_API, NEWS_DATA_IO, PIB, SNOPES, WEB_SEARCH } from '@/constants';
import { z } from 'zod';

export interface VideoDetails {
  url: string;
  caption: string;
  transcript: string;
}
export const QueriesSchema = z.object({
  semanticSearch: z.string(),
  factCheckWeb: z.string(),
  newsWebSearch: z.string(),
  webSearch: z.string(),
});
export type Queries = z.infer<typeof QueriesSchema>;

export const ExtractorResponseSchema = z.object({
  text: z.string(),
  caption: z.string(),
  claimedFacts: z.array(
    z.object({
      fact: z.string(),
      // category: z.enum(),
      queries: QueriesSchema,
    }),
  ),
});
export type ExtractorResponse = z.infer<typeof ExtractorResponseSchema>;

export const RetrieverRequestSchema = z.object({
  fact: z.string(),
  searchQuery: z.string(),
});
export type RetrieverRequest = z.infer<typeof RetrieverRequestSchema>;

export const RetrieverResultSchema = z.object({
  source: z.enum([GOOGLE_FACT_CHECK, PIB, SNOPES, NEWS_API, NEWS_DATA_IO, WEB_SEARCH]),
  sourceRelevance: z.number().min(0.1).max(1.0),
  title: z.string().optional(),
  text: z.string(),
  url: z.string(),
  date: z.string(),
  textualRating: z.string().optional(),
});
export type RetrieverResult = z.infer<typeof RetrieverResultSchema>;

export const RetrieverResultsSchema = z.array(RetrieverResultSchema);
export type RetrieverResults = z.infer<typeof RetrieverResultsSchema>;

export const RetrieverResponseSchema = z.object({
  fact: z.string(),
  results: RetrieverResultsSchema,
});
export type RetrieverResponse = z.infer<typeof RetrieverResponseSchema>;
