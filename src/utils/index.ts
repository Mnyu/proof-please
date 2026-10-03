import { createHash } from 'crypto';

const createSHA256Hash = (input: string) => {
  return createHash('sha256').update(input).digest('hex');
};

export { createSHA256Hash };
