const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('../middlewares');
const UserController = require('../controllers/UserController');
const RecipeController = require('../controllers/RecipeController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => { response.send(); });
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', 
  middlewares.validateNameAndPass, 
  middlewares.emailAlreadyExists,
  UserController.createUser);

app.post('/login',
  middlewares.verifyEmailAndPassword, 
  middlewares.isValidEmailOrPassword,
  UserController.login);

app.post('/recipes',
  middlewares.entriesValidator,
  middlewares.validateJWT,
  RecipeController.createRecipe);

app.get('/recipes', RecipeController.getRecipes);

module.exports = app;
