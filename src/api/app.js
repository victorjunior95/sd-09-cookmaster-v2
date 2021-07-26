const express = require('express');
const bodyParser = require('body-parser');
const {
  createUser,
  getAllRecipes,
  login,
  insertRecipe,
  getRecipeById,
  // deleteRecipeById,
} = require('../middleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUser);

app.post('/login', login);

app.post('/recipes', insertRecipe);
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipeById);
// app.delete('/recipes/:id', deleteRecipeById);

module.exports = app;
