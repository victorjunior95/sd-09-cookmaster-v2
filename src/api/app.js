const express = require('express');
const bodyParser = require('body-parser');

const usersControllers = require('../../controllers/usersControllers');
const recipesControllers = require('../../controllers/recipesControllers');

const app = express();

app.use(bodyParser.json());

app.post('/users', usersControllers.insertUser);

app.post('/login', usersControllers.userLogin);

app.post('/recipes', recipesControllers.insertRecipe);

app.get('/recipes', recipesControllers.getAllRecipes);

app.get('/recipes/:id', recipesControllers.getRecipeById);

app.put('/recipes/:id', recipesControllers.updateRecipeById);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
