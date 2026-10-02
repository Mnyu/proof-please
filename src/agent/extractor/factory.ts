import { getExtractorLLM } from '@/llm/factory';
import { log } from '@/observability/logger';
import { ExtractorResponseSchema } from '@/types/types';
import { createAgent } from 'langchain';

const EXTRACTOR_SYSTEM_PROMPT = `Extract all the facts from the user message which contains a text and a caption. 
Also, transform each fact into a query suitable for semantic search, search on fact check websites, search news websites,
and normal web search to verify the fact with citation. Respond in the given structured format. Response should only be in English`;

const buildExtractorAgent = async () => {
  const llm = getExtractorLLM();
  log.info('Creating extractor agent...');
  return createAgent({
    model: llm,
    tools: [],
    middleware: [], // check if any middleware required
    systemPrompt: EXTRACTOR_SYSTEM_PROMPT,
    responseFormat: ExtractorResponseSchema,
  });
};

export { buildExtractorAgent };
