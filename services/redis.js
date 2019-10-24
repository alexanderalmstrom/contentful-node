const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const client = redis.createClient(process.env.REDIS_URL || {
  host: 'localhost',
  port: 6379
});

client.unref();
client.on('error', console.log);

const store = new RedisStore({ client });

module.exports = store;
