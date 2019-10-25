const path = require('path');
const express = require('express');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const contentful = require('../services/contentful');
const { getCache, setCache, richTextOptions } = require('../utils');

const router = express.Router();

router.get('/', (req, res, next) => {
  const postsQuery = {
    'content_type': 'post',
    'limit': 1000
  }

  const getPage = contentful.getEntry(process.env.CONTENTFUL_HOME_ID);
  const getPosts = contentful.getEntries(postsQuery);

  Promise.all([getPage, getPosts]).then(([page, { items }]) => {
    res.render('home', { page, posts: items });
  });
});

router.get('/:content_type/:slug', (req, res) => {
  const { content_type, slug } = req.params;

  const singlePostQuery = {
    content_type,
    'fields.slug[match]': slug
  }

  function render (post) {
    res.render(content_type, { ...post, documentToHtmlString, richTextOptions });
  }

  if (getCache(slug)) {
    getCache(slug, (post) => render(post));
  } else {
    contentful.getEntries(singlePostQuery)
      .then(({ items }) => setCache(slug, items[0]))
      .then((post) => render(post));
  }
});

module.exports = router;
