const path = require('path');
const express = require('express');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const { redisClient } = require('../services/redis');
const contentful = require('../services/contentful');
const { richTextOptions } = require('../utils');

const router = express.Router();

router.get('/', (req, res) => {
  contentful.getEntry(process.env.CONTENTFUL_HOME_ID)
    .then(payload => res.render('index', payload));
});

router.get('/:content_type/:slug', (req, res) => {
  const { content_type, slug } = req.params;

  const query = {
    content_type,
    'fields.slug[match]': slug
  }

  contentful.getEntries(query)
    .then(payload => {
      const cacheKey = `${content_type}_${slug}`;
      const responseValue = payload.items[0];

      redisClient.get(cacheKey, (err, cacheValue) => {
        const viewData = cacheValue ? JSON.parse(cacheValue) : responseValue;

        res.render(content_type, {
           ...viewData,
          documentToHtmlString,
          richTextOptions
        });

        if (!cacheValue) {
          redisClient.set(cacheKey, JSON.stringify(responseValue));
        }
      });
    });
});

module.exports = router;
