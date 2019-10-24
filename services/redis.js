const redis = require('redis');
const session = require('express-session');
const ConnectRedis = require('connect-redis')(session);

const redisClient = redis.createClient(process.env.REDIS_URL || {
  host: 'localhost',
  port: 6379
});

redisClient.unref();
redisClient.on('error', console.log);

const redisStore = new ConnectRedis({ client: redisClient });

module.exports = {
  redisClient,
  redisStore
};
