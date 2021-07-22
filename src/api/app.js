const express = require('express');
const { resolve } = require('path');
const { imageUpload } = require('./multer');
const { createUser, login } = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');
const validateJWT = require('./middlewares/validateJWT');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(express.json());

app.get('/images/:id', express.static(resolve(__dirname, '..', 'uploads')));
app.post('/users', createUser);
app.post('/login', login);
app.post('/recipes', validateJWT, recipesController.createRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipesById);
app.put('/recipes/:id', validateJWT, recipesController.updateRecipe);
app.delete('/recipes/:id', validateJWT, recipesController.deleteRecipe);
app.put('/recipes/:id/image', imageUpload.single('image'),
 validateJWT, recipesController.updateRecipeWithImage);

module.exports = app;