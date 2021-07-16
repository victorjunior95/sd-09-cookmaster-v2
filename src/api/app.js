const express = require('express');
const bodyParser = require('body-parser').json();

const userController = require('../controllers/usersController');
// const recipeController = require('../controllers/recipesController');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userController);

module.exports = app;
