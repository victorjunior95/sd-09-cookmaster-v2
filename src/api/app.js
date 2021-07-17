const express = require('express');
const rescue = require('express-rescue');
const usersController = require('../controllers/UsersController');
const loginController = require('../controllers/login');
const recipeController = require('../controllers/recipesController');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersController);
app.use('/login', rescue(loginController));
app.use('/recipes', rescue(recipeController));
app.use(errorMiddleware);

module.exports = app;
