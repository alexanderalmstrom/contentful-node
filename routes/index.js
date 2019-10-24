const path = require('path');
const express = require('express');
const BLOCKS = require('@contentful/rich-text-types').BLOCKS;
const renderRichText = require('@contentful/rich-text-html-renderer').documentToHtmlString;

const contentful = require('../services/contentful');

const router = express.Router();

router.get('/', (req, res) => {
  contentful.getEntry(process.env.CONTENTFUL_HOME_ID)
    .then(payload => res.render('index', payload));
});

router.get('/:type/:slug', (req, res) => {
  const { type, slug } = req.params;

  const query = { 'content_type': type, 'fields.slug[match]': slug }

  const renderEntry = ({ sys, fields }) => {
    const {
      contentType: {
        sys: {
          id
        }
      },
    } = sys;

    switch(id) {
      case 'column':
        return column(fields);
    }
  }

  const column = ({ text }) => `<p>${text}</p>`;

  const renderAsset = ({ fields }) => {
    const {
      title,
      file: {
        url
      }
    } = fields;

    return `<img src="${url}" alt=${title} />`;
  }

  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => renderEntry({ ...node.data.target }),
      [BLOCKS.EMBEDDED_ASSET]: (node) => renderAsset({ ...node.data.target })
    }
  }

  contentful.getEntries(query)
    .then(payload => res.render(type, { ...payload.items[0], renderRichText, richTextOptions }));
});

module.exports = router;
