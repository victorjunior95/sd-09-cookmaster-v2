const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { createUser, login } = require('../controllers/userController');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} = require('../controllers/recipeController');

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUser);
app.post('/login', login);
app.post('/recipes', createRecipe);
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipeById);
app.put('/recipes/:id', updateRecipe);

module.exports = app;