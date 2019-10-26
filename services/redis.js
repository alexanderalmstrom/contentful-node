const redis = require('redis');
const session = require('express-session');
const ConnectRedis = require('connect-redis')(session);
const asyncRedis = require('async-redis');

const redisClient = redis.createClient(process.env.REDIS_URL || {
  host: 'localhost',
  port: 6379
});

redisClient.unref();
redisClient.on('error', console.log);

const redisStore = new ConnectRedis({ client: redisClient });
const asyncRedisClient = asyncRedis.decorate(redisClient);

module.exports = {
  redisClient: asyncRedisClient,
  redisStore
};
