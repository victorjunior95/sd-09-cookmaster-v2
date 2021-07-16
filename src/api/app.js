const express = require('express');
const usersController = require('../controllers/Users');
const loginController = require('../controllers/Login');
const recipesController = require('../controllers/Recipes');
const imagesController = require('../controllers/Images');
const { resolve, join } = require('path');
const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador
app.use('/users', usersController);
app.use('/login', loginController);
app.use('/recipes', recipesController);
// app.use('/images', imagesController);
app.use('/images', express.static(resolve(join(__dirname, '..'), 'uploads')));

module.exports = app;
