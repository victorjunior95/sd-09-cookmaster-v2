const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes');
const error = require('../middlewares/error');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(routes);
app.use(error);

module.exports = app;
