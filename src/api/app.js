const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const middlewares = require('../middlewares/validateUsers');

const { create, login } = require('../controllers/users');

app.post('/users', middlewares.validateNamePass, middlewares.emailAlreadyExists, create);

app.post('/login', middlewares.isValidLogin, login);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
