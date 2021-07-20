const express = require('express');
const bodyParser = require('body-parser').json();

const router = require('./routes/router');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);

app.use(errorHandler);

module.exports = app;
