const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routerUser = require('../routes/Users');
const routerLogin = require('../routes/Login');
const routerRecipes = require('../routes/Recipes');

const app = express();

app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', routerUser);
app.use('/login', routerLogin);
app.use('/recipes', routerRecipes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
