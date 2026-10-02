import { RetrieverRequest, RetrieverResponse } from '@/types/types';

const retrieve = async (request: RetrieverRequest): Promise<RetrieverResponse> => {
  return { fact: request.fact, searchResults: [] };
};

export { retrieve };
