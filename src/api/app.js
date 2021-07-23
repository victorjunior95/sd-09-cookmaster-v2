const express = require('express');
const bodyParser = require('body-parser').json();

const errorMiddleware = require('../middlewares/errorMiddleware');
const usersController = require('../controllers/usersController');
const validateUser = require('../middlewares/validateUser');
const validateLogin = require('../middlewares/validateLogin');
const userLoginController = require('../controllers/loginController');
const validateToken = require('../middlewares/validateToken');
const recipesController = require('../controllers/recipesController');
const validateRecipe = require('../middlewares/validateRecipes');
const uploadImage = require('../middlewares/upload');

const app = express();

app.use(bodyParser);
app.post('/users', validateUser, usersController);
app.post('/login', validateLogin, userLoginController);
app.post('/recipes', validateRecipe, validateToken, recipesController.recipesController);

app.get('/recipes', recipesController.listRecipeController);
app.get('/recipes/:id', recipesController.recipeIdController);

app.put('/recipes/:id', validateToken, recipesController.recipeEditController);
app.delete('/recipes/:id', validateToken, recipesController.deleteRecipeController);

app.put('/recipes/:id/image/',
  validateToken,
  uploadImage.single('image'),
  recipesController.uploadImage);

// Não remover esse end-point, ele é necessário para o avaliador
app.use(errorMiddleware.errorMidd);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;