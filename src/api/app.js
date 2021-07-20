const express = require('express');
const bodyParser = require('body-parser').json();
// const cors = require('cors');
const errorMiddleware = require('../middlewares/errorMiddleware');
const usersController = require('../controllers/usersController');
const validateUser = require('../middlewares/validateUser');
const validateLogin = require('../middlewares/validateLogin');
const userLoginController = require('../controllers/loginController');
const validateToken = require('../middlewares/validateToken');
const recipesController = require('../controllers/recipesController');
const validateRecipe = require('../middlewares/validateRecipes');
// const listRecipeController = require('../controllers/recipesController');

const app = express();

app.use(bodyParser);
// app.use(bodyParser.urlencoded({ extended: true }));
app.post('/users', validateUser, usersController);
app.post('/login', validateLogin, userLoginController);
app.post('/recipes', validateRecipe, validateToken, recipesController.recipesController);

app.get('/recipes', recipesController.listRecipeController);
app.get('/recipes/:id', recipesController.recipeIdController);

app.put('/recipes/:id', validateToken, recipesController.recipeEditController);
app.delete('/recipes/:id', validateToken, recipesController.deleteRecipeController);

// Não remover esse end-point, ele é necessário para o avaliador
app.use(errorMiddleware.errorMidd);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;