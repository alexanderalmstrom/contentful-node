const express = require('express');

const { redisClient } = require('../services/redis');

const router = express.Router();

router.get('/clear-cache', (req, res) => {
  redisClient.flushdb((err, status) => {
    res.send(status);
  });
});

router.get('/clear-cache/:slug', (req, res) => {
  const { slug } = req.params;

  redisClient.del(slug, (err, response) => {
    if (response === 1) {
      res.send(`${slug} is deleted!`);
    } else {
      res.send(`${slug} does not exist.`);
    }
  });
});

module.exports = router;
