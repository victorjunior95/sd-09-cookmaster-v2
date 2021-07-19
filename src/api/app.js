const express = require('express');
const bodyParser = require('body-parser').json();

const userController = require('../controllers/usersController');
const loginController = require('../controllers/loginControler');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userController);

app.use('/login', loginController);

module.exports = app;
