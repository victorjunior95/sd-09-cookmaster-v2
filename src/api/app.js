const express = require('express');
const bodyParser = require('body-parser').json();

const router = require('./routes/router');
const { errorHandler, serverErrorHandler } = require('./middlewares/errorHandlers');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);

app.use(errorHandler, serverErrorHandler);

module.exports = app;
