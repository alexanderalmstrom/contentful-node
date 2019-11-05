require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');

const { redisStore } = require('./services/redis');
const { page, post, cache } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.set('views', path.join(__dirname, app.get('env') == 'production' ? 'public' : 'views'));
app.set('view engine', 'pug');

// Development
if (app.get('env') === 'development') {
  const webpackConfig = require('./webpack.config')({}, { mode: 'development' });

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));

  app.use(morgan('dev'));
}

// Production
if (app.get('env') === 'production') {
  app.use(helmet());

  app.use(morgan('combined'));
}

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    redisStore,
    secret: process.env.SESSION_SECRET || 'some secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true
    }
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', page, post, cache);

app.use((error, req, res, next) => {
  res.status(500).render('404', { error });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
