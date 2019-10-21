require('dotenv').config();

const path = require('path');
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const routes = require('../config/routes');

const app = express();

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(process.cwd(), 'public')));

app.set('views', path.join(process.cwd(), 'public', 'views'));
app.set('view engine', 'pug');

app.use('/', routes);
app.use('/.netlify/functions/index', routes);

module.exports = app;
module.exports.handler = serverless(app);
