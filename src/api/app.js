const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const middlewaresUser = require('../middlewares/validateUsers');
const middewareJWT = require('../middlewares/validateJWT');
const isValidRecipe = require('../middlewares/recipesValidation');
const { create, login } = require('../controllers/users');
const { createRecipes, getAllRecipes, searchById } = require('../controllers/recipes');

app.post('/users', middlewaresUser.validateNamePass, middlewaresUser.emailAlreadyExists, create);
app.get('/recipes/:id', searchById);
app.get('/recipes', getAllRecipes);
app.post('/recipes', middewareJWT, isValidRecipe, createRecipes);
app.post('/login', middlewaresUser.isValidLogin, login);

app.use((error, req, res, _next) => {
  if (!error.status) {
    return res.status(500).json(error);
  } 
res.status(error.status).json({ message: error.message });
});

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
