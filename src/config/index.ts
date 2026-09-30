import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { z } from 'zod';

const ConfigSchema = z.object({
  video: z.object({
    maxDuration: z.number(),
  }),
  extractor: z.object({
    baseurl: z.string().optional(),
    provider: z.string(),
    model: z.string(),
  }),
  googleFactCheck: z.object({
    pageSize: z.number().nonnegative().default(3),
    maxClaims: z.number().nonnegative().default(3),
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
