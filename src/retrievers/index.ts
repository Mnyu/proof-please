import { RetrieverRequest, RetrieverResults } from '@/types/types';

interface Retriever {
  retrieve: (request: RetrieverRequest) => Promise<RetrieverResults>;
}

export { retrieve as retrieveFromGoogleFactCheck } from './factChecker/googleFactCheck';
export { retrieve as retrieveFromPibFactCheck } from './factChecker/pib';
export { retrieve as retrieveFromSnopesFactCheck } from './factChecker/snopesWebSearch';
export { retrieve as retrieveFromNewsApi } from './news/newsApi';
export { retrieve as retrieveFromNewsDataIo } from './news/newsDataIo';
export { retrieve as retrieveFromWeb } from './webSearch/webSearch';
