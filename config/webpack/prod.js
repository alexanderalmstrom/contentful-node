const path = require('path');
const webpack = require('webpack');
const CssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin  = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',

  output: {
    filename: '[name].[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: CssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
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
    new CssExtractPlugin({
      filename: '[name].[hash].css'
    })
  ]
};
