import {
  CONTRADICTS,
  FALSE,
  GOOGLE_FACT_CHECK,
  MISLEADING,
  NEWS_API,
  NEWS_DATA_IO,
  OUTDATED,
  PARTIALLY_TRUE,
  PIB,
  SAYS_NOTHING,
  SNOPES,
  SUPPORTS,
  TRUE,
  UNVERIFIABLE,
  WEB_SEARCH,
} from '@/constants';
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
  searchQuery: z.string(),
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
  searchResults: RetrieverResultsSchema,
});
export type RetrieverResponse = z.infer<typeof RetrieverResponseSchema>;

export const AnalysisAnswersSchema = z.object({
  // contextRelevance: z.object({
  //   score: z.number(),
  //   confidence: z.number(),
  // }),
  // claimSupport: z.object({
  //   choice: z.enum([NONE, PARTIAL, DIRECT]),
  //   confidence: z.number(),
  // }),
  // claimContradiction: z.object({
  //   choice: z.enum([NONE, PARTIAL, DIRECT]),
  //   confidence: z.number(),
  // }),
  // verdict: z.object({
  //   choice: z.enum([TRUE, FALSE, MISLEADING, UNVERIFIABLE, OUTDATED]),
  //   confidence: z.number(),
  // }),
  relation: z.object({
    choice: z.enum([SUPPORTS, CONTRADICTS, SAYS_NOTHING]),
    confidence: z.number(),
  }),
});

export const SearchResultAnalysisSchema = z.object({
  model: z.string(),
  answers: AnalysisAnswersSchema,
});
export type SearchResultAnalysis = z.infer<typeof SearchResultAnalysisSchema>;

// export const AnalysisResultSchema = z.object({
//   ...RetrieverResultSchema,
//   ...AnalysisAnswersSchema,
// });
export const AnalysisResultSchema = RetrieverResultSchema.and(AnalysisAnswersSchema);
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

export const VerifierResultSchema = z.object({
  verdict: z.enum([TRUE, FALSE, PARTIALLY_TRUE, MISLEADING, UNVERIFIABLE, OUTDATED]),
  confidence: z.number().min(0).max(1),
  rationale: z.string(),
  support: z.array(
    z.object({
      argument: z.string(),
      citation: z.string(),
    }),
  ),
  contradict: z.array(
    z.object({
      argument: z.string(),
      citation: z.string(),
    }),
  ),
});

export const VerifierResponseSchema = z.object({
  verdict: z.enum([TRUE, FALSE, PARTIALLY_TRUE, MISLEADING, UNVERIFIABLE, OUTDATED]),
  confidence: z.number().min(0).max(1),
  rationale: z.string(),
  shortResponseForUser: z.string().max(500),
  longResponseForUser: z.string(),
  factResults: z.record(
    z.string().describe('the claimed fact for which the verifier result object belongs'),
    VerifierResultSchema,
  ),
});
export type VerifierResponse = z.infer<typeof VerifierResponseSchema>;
