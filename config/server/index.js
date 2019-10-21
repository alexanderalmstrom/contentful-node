require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');

const routes = require('../routes');

const commonConfig = require('../webpack/common');
const devConfig = require('../webpack/dev');

const app = express();

app.set('views', path.resolve(process.cwd(), 'public'));
app.set('view engine', 'pug');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(process.cwd(), 'public')));

const webpackConfig =  merge(commonConfig, devConfig);
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  writeToDisk: true
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.use('/api', proxy({
  target: 'http://localhost:9000',
  changeOrigin: true
}));

app.use('/', routes);

module.exports = app;
module.exports.handler = serverless(app);
