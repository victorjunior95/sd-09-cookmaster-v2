const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const routes = require('./routes');

app.use(bodyParser.json());
app.use('', routes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.get('/', (request, response) => { response.send(); });

module.exports = app;
