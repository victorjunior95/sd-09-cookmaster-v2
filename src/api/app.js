const express = require('express');
const bodyParser = require('body-parser').json();
const errorMiddleware = require('../middlewares/error');
const Users = require('../Controllers/usersController');
const Recipes = require('../Controllers/recipesController');
const { recipeValidate } = require('./auth/validateJWT');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', Users.userCreate);
app.post('/login', Users.userLogin);
app.post('/recipes', recipeValidate, Recipes.recipeCreate);
app.get('/recipes', Recipes.getAll);

app.use(errorMiddleware); 

module.exports = app;
