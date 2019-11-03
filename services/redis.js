if (!process.env.REDIS_URL) {
  throw new Error('Provide a REDIS_URL in environment variables.');
};

const Redis = require('ioredis');
const session = require('express-session');
const ConnectRedis = require('connect-redis')(session);

const redisClient = new Redis(process.env.REDIS_URL);
const redisStore = new ConnectRedis({ client: redisClient });

module.exports = {
  redisClient,
  redisStore
};
