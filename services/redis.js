const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const client = redis.createClient();

client.unref();
client.on('error', console.log);

const store = new RedisStore({ client });

module.exports = store;
