const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('../middlewares');
const UserController = require('../controllers/UserController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => { response.send(); });
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', 
  middlewares.validateNameAndPass, 
  middlewares.emailAlreadyExists,
  UserController.createUser);

module.exports = app;
