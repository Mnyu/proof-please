import { GOOGLE_FACT_CHECK } from '@/constants';
import { RetrieverRequest, RetrieverResults } from '@/types/types';

const retrieve = async (request: RetrieverRequest): Promise<RetrieverResults> => {
  return [
    {
      source: GOOGLE_FACT_CHECK,
      text: '',
      url: '',
      relevance: 0.1,
    },
  ];
};

export { retrieve };
