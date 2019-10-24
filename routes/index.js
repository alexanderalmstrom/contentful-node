const path = require('path');
const express = require('express');

const contentful = require('../services/contentful');

const router = express.Router();

router.get('/', (req, res) => {
  contentful.getEntry(process.env.CONTENTFUL_HOME_ID)
    .then(payload => res.render('index', payload))
    .catch(error => console.log(error));
});

router.get('/:type/:slug', (req, res) => {
  const query = {
    'content_type': req.params.type,
    'fields.slug[match]': req.params.slug
  }

  contentful.getEntries(query)
    .then(payload => res.render('post', payload.items[0]))
    .catch(error => console.log(error));
});

module.exports = router;
