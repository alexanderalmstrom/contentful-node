const path = require('path');
const express = require('express');

const contentful = require('../services/contentful');

const router = express.Router();

router.get('/', (req, res) => {
  contentful.getEntry(process.env.CONTENTFUL_HOME_ID)
    .then(payload => res.render('index', payload));
});

router.get('/:type/:slug', (req, res) => {
  const { type, slug } = req.params;

  const query = { 'content_type': type, 'fields.slug[match]': slug }

  contentful.getEntries(query)
    .then(payload => res.render(type, payload.items[0]));
});

module.exports = router;
