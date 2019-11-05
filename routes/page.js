const express = require('express');

const { contentfulClient } = require('../services/contentful');

const router = express.Router();

const { CONTENTFUL_HOME_ID } = process.env;

router.get('/', (req, res) => {
  const postsQuery = {
    'content_type': 'post',
    'limit': 1000
  }

  Promise.all([
    contentfulClient.getEntry(CONTENTFUL_HOME_ID),
    contentfulClient.getEntries(postsQuery)]
  )
    .then(([page, { items }]) => {
      res.render('home', { page, posts: items });
    });
});

module.exports = router;
