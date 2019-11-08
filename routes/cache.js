const express = require('express');
const { redisClient } = require('../services/redis');

const router = express.Router();

router.get('/clear-cache', async (req, res, next) => {
  const status = await redisClient.flushdb();

  if (status === 'OK') {
    res.send('All cache was sucessfully cleared!');
  } else {
    res.send('Something went wrong!');
  }
});

router.get('/clear-cache/:slug', async (req, res, next) => {
  const { slug } = req.params;
  const status = await redisClient.del(slug);

  if (status === 1) {
    res.send(`${slug} successfully deleted from cache :)`);
  } else {
    res.send(`${slug} was not found in cache :(`);
  }
});

module.exports = router;
