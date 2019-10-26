const express = require('express');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const contentful = require('../services/contentful');
const { getCache, setCache, richTextOptions } = require('../utils');

const router = express.Router();

router.get('/:content_type/:slug', (req, res) => {
  const { content_type, slug } = req.params;

  const singlePostQuery = {
    content_type,
    'fields.slug[match]': slug
  }

  if (getCache(slug)) {
    getCache(slug, (post) => render(post));
  } else {
    contentful.getEntries(singlePostQuery)
      .then(({ items }) => setCache(slug, items[0]))
      .then((post) => render(post));
  }

  function render (post) {
    res.render(content_type, { ...post, documentToHtmlString, richTextOptions });
  }
});

module.exports = router;
