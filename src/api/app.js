const bodyParser = require('body-parser');
const express = require('express');
const router = require('./router');

const middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.json());
app.use(router);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(middlewares.error);

module.exports = app;
