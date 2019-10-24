const { redisClient } = require('../services/redis');

const cache = (key, value, callback) => {
  redisClient.get(key, (err, cacheValue) => {
    if (cacheValue) {
      value = JSON.parse(cacheValue);
    } else {
      redisClient.set(key, JSON.stringify(value));
    }

    if (callback) callback(value);
  });
}

module.exports = cache;
