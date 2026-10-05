export type ClaimedFactDTO = {
  fact: string;
  verdict: string;
  confidence: number;
  rationale: string;
  citations: string[];
};

export type ProofDTO = {
  thumbnailUrl: string;
  title: string;
  verdict: string;
  timeTaken: string;
};
