const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    app: path.resolve(process.cwd(), 'src', 'index.js')
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(process.cwd(), 'public'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      filter: function (file) {
        if (file.isChunk) return true;
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/views/layout.pug',
      filename: 'layout.pug'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/views'
      }
    ])
  ]
};
