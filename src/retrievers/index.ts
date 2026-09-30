import { RetrieverRequest, RetrieverResults } from '@/types/types';

interface Retriever {
  retrieve: (request: RetrieverRequest) => Promise<RetrieverResults>;
}

export { retrieve as retrieveFromGoogleFactCheck } from './factCheckDB/googleFactCheck';
export { retrieve as retrieveFromPibFactCheck } from './factCheckDB/pib';
export { retrieve as retrieveFromSnopesFactCheck } from './factCheckDB/snopesWebSearch';
export { retrieve as retrieveFromNewsApi } from './news/newsApi';
export { retrieve as retrieveFromNesDataIo } from './news/newsDataIo';
export { retrieve as retrieveFromWeb } from './webSearch/webSearch';
