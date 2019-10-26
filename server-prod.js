if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const session = require('express-session');
const morgan = require('morgan');

const { redisStore } = require('./services/redis');
const { page, post, cache } = require('./routes');

const PORT = process.env.PORT || 5000;

const app = express();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'pug');

app.use(helmet());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined'));

app.use(
  session({
    redisStore,
    secret: process.env.SESSION_SECRET || 'some secret',
    resave: false
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', page, post, cache);

app.use((err, req, res, next) => {
  res.status(500).render('404', {
    error: err
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
