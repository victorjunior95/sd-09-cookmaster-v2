const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/routes');
const ErrorMiddleware = require('../middlewares/ErrorMiddleware');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(router);
app.use(ErrorMiddleware);

module.exports = app;
