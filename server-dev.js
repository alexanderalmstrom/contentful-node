require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');

const { redisStore } = require('./services/redis');
const { post, page, cache } = require('./routes');

const webpackConfig = require('./webpack.config')({}, { mode: 'development' });

const PORT = 5000;
const HOST = '0.0.0.0';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(
  session({
    redisStore,
    secret: process.env.SESSION_SECRET || 'some secret',
    resave: false
  })
);

app.use(express.static(path.join(__dirname, 'public')));

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use('/', cache, page, post);

app.use((err, req, res, next) => {
  res.status(500).render('404', {
    error: err
  });
});

app.listen(PORT, HOST);

console.log(`Listening on http://${HOST}:${PORT}`);
