require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000;
const HOST = '0.0.0.0';

const app = express();

const routes = require('./routes');
const webpackConfig = require('./webpack.config')({}, { mode: 'development' });

app.set('views', path.resolve(process.cwd(), 'views'));
app.set('view engine', 'pug');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(process.cwd(), 'public')));

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use('/', routes);

app.listen(PORT, HOST);

console.log(`Listening on http://${HOST}:${PORT}`);
