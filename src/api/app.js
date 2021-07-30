const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser').json();
const usersController = require('../controllers/users');
const recipesController = require('../controllers/recipes');
const errors = require('../middlewares/errors');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', rescue(usersController.newUser));
app.post('/login', rescue(usersController.login));
app.post('/recipes', recipesController.tokenValidation, rescue(recipesController.newRecipe));
app.post('/users/admin', recipesController.tokenValidation, rescue(usersController.newUser));
app.get('/recipes', recipesController.fetchRecipes);
app.get('/recipes/:id', rescue(recipesController.getById));
app.put('/recipes/:id', recipesController.tokenValidation, rescue(recipesController.editRecipe));
app.delete('/recipes/:id',
  recipesController.tokenValidation,
  rescue(recipesController.deleteRecipe));
app.use(errors);

module.exports = app;
