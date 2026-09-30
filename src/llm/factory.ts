import { config } from '@/config';
import { LM_STUDIO } from '@/constants';
import { log } from '@/observability/logger';
import { ChatOpenAI } from '@langchain/openai';

const getExtractorLLM = () => {
  const provider = config.extractor.provider;
  const model = config.extractor.model;
  log.info(`Using LLM provider: ${provider}, model : ${model}`);

  if (provider === LM_STUDIO) {
    return new ChatOpenAI({
      model: model,
      temperature: 0,
      configuration: {
        baseURL: config.extractor.baseurl,
        apiKey: process.env.EXTRACTOR_LLM_API_KEY,
      },
    });
  }
  throw new Error(`No LLM providers other than ${LM_STUDIO} currently supported`);
};

export { getExtractorLLM };
