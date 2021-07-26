const express = require('express');
const bodyParser = require('body-parser');
const {
  createUser,
  getAllRecipes,
  login,
  insertRecipe,
  getRecipeById,
  deleteRecipeById,
  updateRecipeById,
} = require('../middleware');

const app = express();
app.use(bodyParser.json());
// app.use('/images', express.static(__dirname, '..', 'uploads'));

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
app.delete('/recipes/:id', deleteRecipeById);
app.put('/recipes/:id', updateRecipeById);
// app.post('/recipes/:id/image', insertImage);

module.exports = app;
