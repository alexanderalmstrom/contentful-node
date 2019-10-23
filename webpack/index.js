const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./common');
const dev = require('./dev');
const prod = require('./prod');

module.exports = (env, argv) => {
  return merge(
    common,
    argv.mode === 'production' ? prod : dev
  );
}
