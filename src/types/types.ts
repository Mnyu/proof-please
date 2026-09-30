import { z } from 'zod';

export interface VideoDetails {
  url: string;
  caption: string;
  transcript: string;
}

export const ExtractorResponseSchema = z.object({
  text: z.string(),
  caption: z.string(),
  claimedFacts: z.array(
    z.object({
      fact: z.string(),
      // category: z.enum(),
      queries: z.object({
        semanticSearch: z.string(),
        factCheckWeb: z.string(),
        newsWebSearch: z.string(),
        webSearch: z.string(),
      }),
    }),
  ),
});

export type ExtractorResponse = z.infer<typeof ExtractorResponseSchema>;
