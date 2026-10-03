import { config } from '@/config';
import { redis } from '@/lib/redis';

const checkFactCheckJobUserRateLimit = async (userId: string) => {
  const key = `rate-limit:${config.factCheckJobQueue.name}:${userId}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, config.factCheckJobQueue.requestsWindowInSeconds);
  }
  const ttl = await redis.ttl(key);

  if (count > config.factCheckJobQueue.maxRequestsPerUser) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: ttl,
    };
  }
  return {
    allowed: true,
    remaining: config.factCheckJobQueue.maxRequestsPerUser - count,
  };
};

export { checkFactCheckJobUserRateLimit };
