const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('../config/routes');

const app = express();

app.set('views', path.resolve(process.cwd(), 'public'));
app.set('view engine', 'pug');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(process.cwd(), 'public')));

app.use('/', routes);

module.exports = app;
