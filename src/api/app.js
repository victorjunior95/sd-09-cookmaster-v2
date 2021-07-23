const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const route = require('../routes/routes');
const middlewareError = require('../middlewares/error');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(route);

// Middleware de Erro
app.use(middlewareError);

module.exports = app;
