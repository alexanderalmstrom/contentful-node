const path = require('path');
const webpack = require('webpack');
const CssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin  = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const RevReplacePlugin = require('./lib/RevReplacePlugin');

module.exports = {
  mode: 'production',

  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
  },

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/views'
      }
    ]),
    new CssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[chunkhash].css',
    }),
    new ManifestPlugin({
      basePath: '/',
      filter: (file) => file.isChunk
    }),
    new RevReplacePlugin({
      manifest: path.resolve(process.cwd(), 'public', 'manifest.json'),
      files: [
        path.resolve(process.cwd(), 'public', 'layout.pug')
      ]
    })
  ]
};
