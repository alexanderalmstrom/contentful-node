const { redisClient } = require('../services/redis');

function setCache (key, data) {
  redisClient.set(key, JSON.stringify(data));
  return data;
}

function getCache (key, callback) {
  return redisClient.get(key, (err, data) => {
    if (callback) callback(JSON.parse(data));
  });
}

module.exports = {
  setCache,
  getCache
};
