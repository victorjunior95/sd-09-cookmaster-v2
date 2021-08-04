const express = require('express');
const bodyParser = require('body-parser');
const User = require('../../controller/User');
const Recipe = require('../../controller/Recipe');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', User.create);
app.post('/login', User.login);
app.post('/recipes', validateJWT, Recipe.create);
app.get('/recipes', Recipe.getAll);
app.get('/recipes/:id', Recipe.findById);

module.exports = app;
