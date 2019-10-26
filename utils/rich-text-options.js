const { BLOCKS, INLINES } = require('@contentful/rich-text-types');

const { renderEntryBlock, renderEntryInline } = require('./entry');
const renderAsset = require('./asset');

const richTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: ({ data }) => renderEntryBlock({ ...data.target }),
    [INLINES.EMBEDDED_ENTRY]: ({ data }) => renderEntryInline({ ...data.target }),
    [BLOCKS.EMBEDDED_ASSET]: ({ data }) => renderAsset({ ...data.target })
  }
}

module.exports = richTextOptions;
