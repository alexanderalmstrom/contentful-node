const { BLOCKS } = require('@contentful/rich-text-types');

const renderEntry = require('./render-entry');
const renderAsset = require('./render-asset');

const richTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: ({ data }) => renderEntry({ ...data.target }),
    [BLOCKS.EMBEDDED_ASSET]: ({ data }) => renderAsset({ ...data.target })
  }
}

module.exports = richTextOptions;
