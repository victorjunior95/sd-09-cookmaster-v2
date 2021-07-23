const express = require('express');
const bodyParser = require('body-parser').json();
const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const loginController = require('../controllers/loginController');

const app = express();
app.use(express.json());
app.use(bodyParser);
require('dotenv').config();

app.use('/login', loginController);
app.use('/users', usersController);
app.use('/recipes', recipesController);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
