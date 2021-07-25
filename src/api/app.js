const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

// Users
const User = require('../controllers/user');

app.route('/users').post(User);

// Login
const Login = require('../controllers/login');

app.route('/login').post(Login);

// Recipes
const Recipes = require('../controllers/recipes');
const validateJWT = require('../middlewares/validateJWT');

app
  .route('/recipes')
  .post(validateJWT, Recipes.create)
  .get(Recipes.list);

// Error
const errorMiddleware = require('../middlewares/error');

app.use(errorMiddleware);

module.exports = app;
