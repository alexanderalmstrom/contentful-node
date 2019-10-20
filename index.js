require('dotenv').config()

const express = require('express');
const path = require('path');
const contentful = require('contentful');

const CONTENTFUL_HOME_ID = process.env.CONTENTFUL_HOME_ID;

const PORT = 5000;
const HOST = '0.0.0.0';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const contentfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

app.get('/', (req, res) => {
  return contentfulClient.getEntry(CONTENTFUL_HOME_ID)
    .then(payload => res.render('index', payload))
    .catch(error => console.log(error));
});

app.get('/post/:slug', (req, res) => {
  console.log(req.params);

  return contentfulClient.getEntries({
    'content_type': 'post',
    'fields.slug[match]': req.params.slug
  })
    .then(payload => res.render('post', payload.items[0]))
    .catch(error => console.log(error));
});

app.listen(PORT, HOST);

console.log(`Listening on http://${HOST}:${PORT}`);
