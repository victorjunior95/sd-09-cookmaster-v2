const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (request, response) => {
  response.send();
});

module.exports = app;
