const express = require('express');

const app = express();
const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const Users = require('./controllers/usersController');
const Login = require('./controllers/loginController');
const Recipes = require('./controllers/recipesController');
  
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', Users);
app.use('/login', Login);
app.use('/recipes', Recipes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
