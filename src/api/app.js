const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const validateJWT = require('../middlewares/validateJWS');
const UserController = require('../controllers/users');
const RecipeController = require('../controllers/recipes');

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UserController.registerUser);
app.post('/users/admin', validateJWT, UserController.registerAdmin);
app.post('/login', UserController.userLogin);
app.post('/recipes', validateJWT, RecipeController.registerRecipe);
app.get('/recipes', RecipeController.getAllRecipes);
app.get('/recipes/:id', RecipeController.getRecipeById);
app.put('/recipes/:id', validateJWT, RecipeController.editRecipe);
app.delete('/recipes/:id', validateJWT, RecipeController.deleteRecipe);
app.put('/recipes/:id/image', validateJWT, RecipeController.addImageToRecipe);

module.exports = app;
