require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000;
const HOST = '0.0.0.0';

const app = express();

const routes = require('./routes');
const commonConfig = require('./webpack/common');
const devConfig = require('./webpack/dev');

app.set('views', path.resolve(process.cwd(), 'views'));
app.set('view engine', 'pug');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(process.cwd(), 'public')));

const webpackConfig =  merge(commonConfig, devConfig);
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.use('/', routes);

app.listen(PORT, HOST);

console.log(`Listening on http://${HOST}:${PORT}`);
