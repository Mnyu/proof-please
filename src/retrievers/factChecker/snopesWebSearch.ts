import { config } from '@/config';
import { SNOPES } from '@/constants';
import { log } from '@/observability/logger';
import { RetrieverRequest, RetrieverResponse } from '@/types/types';
import Exa from 'exa-js';

const exa = new Exa(process.env.EXA_API_KEY);

const retrieve = async (request: RetrieverRequest): Promise<RetrieverResponse> => {
  const retrieverResponse: RetrieverResponse = { fact: request.fact, searchResults: [] };
  try {
    const response = await exa.search(request.searchQuery, {
      includeDomains: ['snopes.com'],
      numResults: config.snopesFactCheck.pageSize,
      contents: { highlights: true },
    });
    const results = response.results;
    if (!results || results.length === 0) {
      log.warn('either snopes results do not exist or snope results are empty');
      return retrieverResponse;
    }
    for (const result of results) {
      if (retrieverResponse.searchResults.length >= config.snopesFactCheck.maxResults) {
        break;
      }
      const highlights = result.highlights && result.highlights.length > 0 ? result.highlights[0] : '';
      retrieverResponse.searchResults.push({
        source: SNOPES,
        sourceRelevance: 0.1,
        title: result.title || '',
        text: highlights,
        url: result.url,
        date: result.publishedDate || '',
      });
    }
  } catch (error) {
    log.error('error getting snopes results');
    log.error(error);
  }
  log.info(`snopes fact checker returned ${retrieverResponse.searchResults.length} results`);
  return retrieverResponse;
};

export { retrieve };
