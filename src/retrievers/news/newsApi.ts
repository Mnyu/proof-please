import { config } from '@/config';
import { NEWS_API } from '@/constants';
import { log } from '@/observability/logger';
import { RetrieverRequest, RetrieverResponse } from '@/types/types';
import { z } from 'zod';

const ArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string(),
  publishedAt: z.string(),
  content: z.string(),
});

const ArticlesSchema = z.array(ArticleSchema);

const ResponseSchema = z.object({
  status: z.string(),
  totalResults: z.number().optional(),
  articles: ArticlesSchema.optional(),
  message: z.string().optional(),
});

type Response = z.infer<typeof ResponseSchema>;

const retrieve = async (request: RetrieverRequest): Promise<RetrieverResponse> => {
  const date = new Date();
  const pastDate = new Date(date.getDate() - 30);
  const today = date.toISOString().split('T')[0]!;
  const todayMinus30Days = pastDate.toISOString().split('T')[0]!;

  const params = new URLSearchParams({
    q: request.searchQuery,
    from: today,
    to: todayMinus30Days,
    sortBy: config.newsApi.sortBy,
    apiKey: process.env.NEWS_API_KEY!,
    pageSize: String(config.newsApi.pageSize),
    page: '1',
  });
  const retrieverResponse: RetrieverResponse = { fact: request.fact, searchResults: [] };
  try {
    const resp = await fetch(`https://newsapi.org/v2/everything?${params}`);
    const response: Response = await resp.json();
    if (response.status != 'ok') {
      throw new Error('news-api did not return ok status in response');
    }
    const articles = response.articles;
    if (!articles || articles.length === 0) {
      log.warn('either articles do not exist or articles are empty');
      return retrieverResponse;
    }
    for (const article of articles) {
      if (retrieverResponse.searchResults.length >= config.newsApi.maxResults) {
        break;
      }
      retrieverResponse.searchResults.push({
        searchQuery: request.searchQuery,
        source: NEWS_API,
        sourceRelevance: 0.1,
        title: article.title,
        text: `${article.description}\n${article.content}`,
        url: article.url,
        date: article.publishedAt,
      });
    }
  } catch (error) {
    log.error('error getting news-api results');
    log.error(error);
  }
  log.info(`news-api returned ${retrieverResponse.searchResults.length} results`);
  return retrieverResponse;
};

export { retrieve };
