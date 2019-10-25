const RevReplacePlugin = require('./rev-replace-plugin');
const renderEntry = require('./render-entry');
const renderAsset = require('./render-asset');
const richTextOptions = require('./rich-text-options');
const { setCache, getCache } = require('./cache');

module.exports = {
  RevReplacePlugin,
  renderEntry,
  renderAsset,
  richTextOptions,
  setCache,
  getCache
}
