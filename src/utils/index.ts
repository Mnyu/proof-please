import { createHash } from 'crypto';

const createSHA256Hash = (input: string) => {
  return createHash('sha256').update(input).digest('hex');
};

const getDurationInMs = (startTime: number) => {
  const endTime = performance.now();
  const durationMs = Math.round(endTime - startTime);
  return durationMs;
};

export { createSHA256Hash, getDurationInMs };
