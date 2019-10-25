const path = require('path');
const express = require('express');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const contentful = require('../services/contentful');
const { cache, richTextOptions } = require('../utils');

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
      cache(slug, payload.items[0], (data) => {
        res.render(content_type, { ...data, documentToHtmlString, richTextOptions });
      });
    });
});

module.exports = router;
