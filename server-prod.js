if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(helmet());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'pug');

app.use((err, req, res, next) => {
  res.status(500).render('404', { error: err });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
