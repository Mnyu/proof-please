// llm providers
export const LM_STUDIO = 'lmstudio';
export const OPEN_AI = 'openai';

// embeddings providers
export const HUGGING_FACE = 'huggingface';

// retrievers
export const PIB = 'PIB';
export const SNOPES = 'Snopes';
export const GOOGLE_FACT_CHECK = 'Google Fact Check';
export const NEWS_API = 'News API';
export const NEWS_DATA_IO = 'News Data IO';
export const WEB_SEARCH = 'Web Search';

//analysis
export const SUPPORTS = 'supports';
export const CONTRADICTS = 'contradicts';
export const SAYS_NOTHING = 'says_nothing';

// verdict
export enum Verdict {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  PARTIALLY_TRUE = 'PARTIALLY_TRUE',
  MISLEADING = 'MISLEADING',
  UNVERIFIABLE = 'UNVERIFIABLE',
  OUTDATED = 'OUTDATED',
  SATIRE = 'SATIRE',
  NONE = 'NONE',
}
// export const TRUE = 'TRUE';
// export const FALSE = 'FALSE';
// export const PARTIALLY_TRUE = 'PARTIALLY_TRUE';
// export const MISLEADING = 'MISLEADING';
// export const UNVERIFIABLE = 'UNVERIFIABLE';
// export const OUTDATED = 'OUTDATED';

// app
export enum JobStatus {
  QUEUED = 'QUEUED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
