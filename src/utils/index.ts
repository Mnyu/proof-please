import { createHash } from 'crypto';

const createSHA256Hash = (input: string) => {
  return createHash('sha256').update(input).digest('hex');
};

const getDurationInMs = (startTime: number) => {
  const endTime = performance.now();
  const durationMs = Math.round(endTime - startTime);
  return durationMs;
};

const getTimeInMinutesSeconds = (timeInMs: number) => {
  const totalSeconds = timeInMs / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toFixed(2);
  const timeString = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  return timeString;
};

export { createSHA256Hash, getDurationInMs, getTimeInMinutesSeconds };
