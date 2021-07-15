const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', require('./routes/users'));

module.exports = app;
