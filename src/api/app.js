const express = require('express');

const app = express();
const { resolve } = require('path');

const { createUser, login } = require('../controllers/userController');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
} = require('../controllers/recipeController');

const { imageUpload } = require('./multer');

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.get('/images/:id', express.static(resolve(__dirname, '..', 'uploads')));
app.post('/users', createUser);
app.post('/login', login);
app.post('/recipes', createRecipe);
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipeById);
app.put('/recipes/:id', updateRecipe);
app.delete('/recipes/:id', deleteRecipe);
app.put('/recipes/:id/image', imageUpload.single('image'), uploadImage);

module.exports = app;