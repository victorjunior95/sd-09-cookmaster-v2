const express = require('express');
const router = require('../routers/router');
const bodyParse = require('body-parser');

const error = require('../middleware/error');

const app = express();
app.use(bodyParse.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);
app.use(error)


module.exports = app;
