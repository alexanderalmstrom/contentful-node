if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const session = require('express-session');
const morgan = require('morgan');

const store = require('./services/redis');
const routes = require('./routes');

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
    store,
    secret: 'panagora',
    resave: false
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(500).render('404', {
    error: err
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
