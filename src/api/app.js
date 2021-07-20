const express = require('express');
const bodyParser = require('body-parser').json();
const controller = require('../controller');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', controller.users.signIn);
app.post('/login', controller.users.login);
app.post('/recipes', validateJWT, controller.recipes.postRecipe);
app.get('/recipes', controller.recipes.getAll);
app.get('/recipes/:id', controller.recipes.getById);
app.put('/recipes/:id', validateJWT, controller.recipes.updateRecipe);
app.delete('/recipes/:id', validateJWT, controller.recipes.deleteRecipe);

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
