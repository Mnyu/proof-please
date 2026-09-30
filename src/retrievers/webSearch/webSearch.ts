import { config } from '@/config';
import { WEB_SEARCH } from '@/constants';
import { log } from '@/observability/logger';
import { RetrieverRequest, RetrieverResults } from '@/types/types';
import Exa from 'exa-js';

const exa = new Exa(process.env.EXA_API_KEY);

const retrieve = async (request: RetrieverRequest): Promise<RetrieverResults> => {
  const retrieverResults: RetrieverResults = [];
  try {
    const response = await exa.search(request.searchQuery, {
      numResults: config.webSearch.pageSize,
      contents: { highlights: true },
    });
    const results = response.results;
    if (!results || results.length === 0) {
      log.warn('either web search results do not exist or web search results are empty');
      return retrieverResults;
    }
    for (const result of results) {
      if (retrieverResults.length >= config.webSearch.maxResults) {
        break;
      }
      const highlights = result.highlights && result.highlights.length > 0 ? result.highlights[0] : '';
      retrieverResults.push({
        source: WEB_SEARCH,
        sourceRelevance: 0.1,
        title: result.title || '',
        text: highlights,
        url: result.url,
        date: result.publishedDate || '',
      });
    }
  } catch (error) {
    log.error('error getting web search results');
    log.error(error);
  }
  log.info(`web search returned ${retrieverResults.length} results`);
  return retrieverResults;
};

export { retrieve };
