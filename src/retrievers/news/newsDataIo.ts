import { config } from '@/config';
import { NEWS_DATA_IO } from '@/constants';
import { log } from '@/observability/logger';
import { RetrieverRequest, RetrieverResponse } from '@/types/types';
import { z } from 'zod';

const ArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  pubDate: z.string(),
  content: z.string(),
});

const ResultsSchema = z.array(ArticleSchema);

const ResponseSchema = z.object({
  status: z.string(),
  totalResults: z.number().optional(),
  results: ResultsSchema.optional(),
  message: z.string().optional(),
});

type Response = z.infer<typeof ResponseSchema>;

const retrieve = async (request: RetrieverRequest): Promise<RetrieverResponse> => {
  const params = new URLSearchParams({
    q: request.searchQuery,
    apiKey: process.env.NEWS_DATA_IO_API_KEY!,
    sort: config.newsDataIo.sortBy,
    size: String(config.newsDataIo.pageSize),
    page: '1',
  });
  const retrieverResponse: RetrieverResponse = { fact: request.fact, searchResults: [] };
  try {
    const resp = await fetch(`https://newsdata.io/api/1/latest?${params}`);
    const response: Response = await resp.json();
    if (response.status != 'success') {
      throw new Error('news-data-io api did not return success status in response');
    }
    const results = response.results;
    if (!results || results.length === 0) {
      log.warn('either results do not exist or results are empty');
      return retrieverResponse;
    }
    for (const result of results) {
      if (retrieverResponse.searchResults.length >= config.newsApi.maxResults) {
        break;
      }
      retrieverResponse.searchResults.push({
        source: NEWS_DATA_IO,
        sourceRelevance: 0.1,
        title: result.title,
        text: result.description,
        url: result.link,
        date: result.pubDate,
      });
    }
  } catch (error) {
    log.error('error getting news-data-io api results');
    log.error(error);
  }
  log.info(`news-data-io api returned ${retrieverResponse.searchResults.length} results`);
  return retrieverResponse;
};

export { retrieve };
