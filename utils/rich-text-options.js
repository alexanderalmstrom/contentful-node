const { BLOCKS, INLINES } = require('@contentful/rich-text-types');

const renderEntry = require('./entry');
const renderAsset = require('./asset');

const richTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: ({ data }) => renderEntry({ ...data.target }),
    [INLINES.EMBEDDED_ENTRY]: ({ data }) => renderEntry({ ...data.target, inline: true }),
    [BLOCKS.EMBEDDED_ASSET]: ({ data }) => renderAsset({ ...data.target })
  }
}

module.exports = richTextOptions;
