const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');

const app = express();

app.use(bodyParser.json());

app.post('/users', userController.createUser);
app.post('/login', userController.userLogin);
app.post('/recipes', recipeController.createRecipe);

app.get('/recipes', recipeController.getAllRecipes);
app.get('/recipes/:id', recipeController.getRecipeById);

app.put('/recipes/:id', recipeController.updateRecipe);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
