const { redisClient } = require('../services/redis');

const cache = async (key, promise) => {
  const value = await redisClient.get(key);

  if (value) {
    return JSON.parse(value);
  } else {
    const payload = await Promise.resolve(promise).then(payload => payload);
    await redisClient.set(key, JSON.stringify(payload));
    return payload;
  }
}

module.exports = cache;
