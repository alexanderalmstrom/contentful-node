const { redisClient } = require('../services/redis');

const cache = async (key, promise) => {
  const value = await redisClient.get(key);

  if (value) {
    return JSON.parse(value);
  } else {
    const data = await Promise.resolve(promise).then(payload => payload);
    redisClient.set(key, JSON.stringify(data));
    return data;
  }
}

module.exports = cache;
