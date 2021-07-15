const express = require('express');
const bodyParser = require('body-parser').json();
const controller = require('../controller');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
app.post('/users', controller.users.signIn);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
