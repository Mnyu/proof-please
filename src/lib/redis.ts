import IORedis from 'ioredis';

const redis = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null, // this is important for BullMQ workers
});

const closeRedis = async () => {
  await redis.quit();
};

export { redis, closeRedis };
