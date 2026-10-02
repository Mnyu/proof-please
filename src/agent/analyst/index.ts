import { log } from '@/observability/logger';
import { SearchResultAnalysis, RetrieverResponse, RetrieverResult, AnalysisResult } from '@/types/types';
import { choice, score, TypeSafeClient } from '@typesafe-ai/sdk';

const client = new TypeSafeClient();

const runAnalysis = async (retriverResponse: RetrieverResponse) => {
  const fact = retriverResponse.fact;
  const searchResults = retriverResponse.searchResults;
  const analysisResults: AnalysisResult[] = [];
  for (const searchResult of searchResults) {
    try {
      const searchResultAnalysis: SearchResultAnalysis = await analyseSearchResult(fact, searchResult);
      analysisResults.push({ ...searchResult, ...searchResultAnalysis.answers });
    } catch (error) {
      log.error('error analysing search result');
      log.error(error);
    }
  }
  return analysisResults;
};

const analyseSearchResult = async (claimedFact: string, searchResult: RetrieverResult) => {
  const response = await client.systemOne({
    state: { claimedFact, searchResult },
    questions: {
      contextRelevance: score('Does the search result contain information relevant to the claimed fact?', [
        'Irrelevant',
        'Barely Relevant',
        'Somewhat Relevant',
        'Relevant',
        'Highly Relevant',
        'Extremely Relevant',
      ]),
      claimSupport: choice('Does the search result actually support the claimed fact?', {
        none: null,
        partial: null,
        direct: null,
      }),
      claimContradiction: choice('Does the search result actually contradict the claimed fact?', {
        none: null,
        partial: null,
        direct: null,
      }),
      verdict: choice('What is the verdict for the given claimed fact given the search result', {
        true: 'well supported by search result',
        false: 'directly contradicted by search result',
        //partiallyTrue: 'core claim true but missing significant context',
        misleading: 'accurate but framed to create a false impression',
        unverifiable: 'insufficient publicly available evidence',
        outdated: 'was true, but contradicted by more recent data',
        //satire: 'content is satirical, no factual claims to verify',
      }),
    },
  });
  return {
    model: response.model,
    answers: {
      contextRelevance: {
        score: response.answers.contextRelevance.score,
        confidence: response.answers.contextRelevance.confidence,
      },
      claimSupport: {
        choice: response.answers.claimSupport.choice,
        confidence: response.answers.contextRelevance.confidence,
      },
      claimContradiction: {
        choice: response.answers.claimContradiction.choice,
        confidence: response.answers.claimContradiction.confidence,
      },
      verdict: {
        choice: response.answers.verdict.choice,
        confidence: response.answers.verdict.confidence,
      },
    },
  };
};

export { runAnalysis };
