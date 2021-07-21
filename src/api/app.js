const express = require('express');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');
const validateJWT = require('./middlewares/validateJWT');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUser);
app.post('/login', login);
app.post('/recipes', validateJWT, recipesController.createRecipe);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipesById);

module.exports = app;