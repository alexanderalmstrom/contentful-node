const { redisClient } = require('../services/redis');

const cache = async (key, promise) => {
  const payload = await Promise.resolve(promise).then(payload => payload);
  const value = await redisClient.get(key);

  if (value) {
    return JSON.parse(value);
  } else {
    await redisClient.set(key, JSON.stringify(payload));
    return payload;
  }
}

module.exports = cache;
