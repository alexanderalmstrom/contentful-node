const express = require('express');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const contentful = require('../services/contentful');
const { cache, richTextOptions } = require('../utils');

const router = express.Router();

router.get('/post/:slug', (req, res) => {
  const { slug } = req.params;

  const singlePostQuery = {
    'content_type': 'post',
    'fields.slug[match]': slug
  }

  cache(slug, contentful.getEntries(singlePostQuery))
    .then(post => {
      res.render('post', {
        post: { ...post.items[0] },
        documentToHtmlString,
        richTextOptions
      });
    });
});

module.exports = router;
