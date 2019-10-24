const path = require('path');
const express = require('express');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const contentful = require('../services/contentful');
const { richTextOptions } = require('../utils');

const router = express.Router();

router.get('/', (req, res) => {
  contentful.getEntry(process.env.CONTENTFUL_HOME_ID)
    .then(payload => res.render('index', payload));
});

router.get('/:type/:slug', (req, res) => {
  const { type, slug } = req.params;

  const query = {
    'content_type': type,
    'fields.slug[match]': slug
  }

  contentful.getEntries(query)
    .then(payload => res.render(type, {
      ...payload.items[0],
      documentToHtmlString,
      richTextOptions
    }));
});

module.exports = router;
