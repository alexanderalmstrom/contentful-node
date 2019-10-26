const express = require('express');

const contentful = require('../services/contentful');

const router = express.Router();

const { CONTENTFUL_HOME_ID } = process.env;

router.get('/', (req, res) => {
  const postsQuery = {
    'content_type': 'post',
    'limit': 1000
  }

  const getPage = contentful.getEntry(CONTENTFUL_HOME_ID);
  const getPosts = contentful.getEntries(postsQuery);

  Promise.all([getPage, getPosts]).then(([page, { items }]) => {
    res.render('home', { page, posts: items });
  });
});

module.exports = router;
