import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { z } from 'zod';

const ConfigSchema = z.object({
  factCheckJobQueue: z.object({
    name: z.string().default('fact-check'),
    requestsWindowInSeconds: z.number().default(3600),
    maxRequestsPerUser: z.number().default(5),
    jobName: z.string().default('fact-check-job'),
    concurrency: z.number().default(3),
  }),
  video: z.object({
    maxDuration: z.number(),
  }),
  extractor: z.object({
    baseurl: z.string().optional(),
    provider: z.string(),
    model: z.string(),
  }),
  verifier: z.object({
    baseurl: z.string().optional(),
    provider: z.string(),
    model: z.string(),
  }),
  googleFactCheck: z.object({
    pageSize: z.number().nonnegative().default(3),
    maxResults: z.number().nonnegative().default(3),
  }),
  snopesFactCheck: z.object({
    pageSize: z.number().nonnegative().default(3),
    maxResults: z.number().nonnegative().default(3),
  }),
  newsApi: z.object({
    pageSize: z.number().nonnegative().default(3),
    maxResults: z.number().nonnegative().default(3),
    sortBy: z.string().default('relevancy'),
  }),
  newsDataIo: z.object({
    pageSize: z.number().nonnegative().default(3),
    maxResults: z.number().nonnegative().default(3),
    sortBy: z.string().default('relevancy'),
  }),
  webSearch: z.object({
    pageSize: z.number().nonnegative().default(5),
    maxResults: z.number().nonnegative().default(5),
  }),
});

type Config = z.infer<typeof ConfigSchema>;

const loadConfig = async (): Promise<Config> => {
  const root = path.dirname(fileURLToPath(import.meta.url));
  const configPath = path.join(root, '/../../config.yaml');
  const content = await readFile(configPath, 'utf-8');
  const raw = YAML.parse(content);
  return ConfigSchema.parse(raw);
};

export const config = await loadConfig();
