const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const TerserPlugin  = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { RevReplacePlugin } = require('./utils');

module.exports = (env, argv) => {
  // Common
  const common = {
    mode: argv.mode || 'development',

    entry: [
      path.resolve(process.cwd(), 'src', 'index.js')
    ],
  
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
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: argv.mode === 'production' ? CssExtractPlugin.loader : 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.pug$/,
          exclude: /\node_modules/,
          loader: 'file-loader'
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
        'process.env.CONTENTFUL_SPACE_ID': JSON.stringify(process.env.CONTENTFUL_SPACE_ID),
        'process.env.CONTENTFUL_ACCESS_TOKEN': JSON.stringify(process.env.CONTENTFUL_ACCESS_TOKEN),
        'process.env.CONTENTFUL_HOME_ID': JSON.stringify(process.env.CONTENTFUL_HOME_ID)
      })
    ]
  }

  // Dev
  const dev = {
    devtool: 'eval-source-map',

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new WriteFilePlugin({
        test: /\.(pug|js|css|svg)$/
      })
    ]
  }

  // Prod
  const prod = {
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
          from: 'views'
        },
        {
          from: 'src/static'
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
  }

  if (argv.mode !== 'production') {
    common.entry.unshift('webpack-hot-middleware/client')
  }

  return merge(
    common,
    argv.mode === 'production' ? prod : dev
  );
}
