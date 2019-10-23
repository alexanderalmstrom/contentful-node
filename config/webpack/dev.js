const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'development',
  
  devtool: 'eval-source-map',

  plugins: [
    new WriteFilePlugin({
      test: /\.(pug|js|css|svg)$/
    })
  ]
};
