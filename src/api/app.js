const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { errorHandling } = require('./services/services');

const {
  validateJWT,
} = require('./services/recipeValid');

const {
  createRecipesControl,
  getAllRecipesControl,
  getRecipeByIdControl,
} = require('./controllers/recipeControl');

const {
  createUserControl,
  loginControl,
} = require('./controllers/userControl');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUserControl);
app.post('/login', loginControl);

app.post('/recipes', validateJWT, rescue(createRecipesControl));
app.get('/recipes', rescue(getAllRecipesControl));
app.get('/recipes/:id', rescue(getRecipeByIdControl));

app.use(errorHandling);

module.exports = app;
