const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const usersController = require('../Controllers/usersController');
const loginController = require('../Controllers/loginController');
const validateToken = require('./authorization/jwt');
const recipesController = require('../Controllers/recipesController');

const app = express();
app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', rescue(usersController.createUser));
app.post('/login', rescue(loginController.login));
app.post('/recipes', rescue(validateToken), rescue(recipesController.create));
app.get('/recipes', recipesController.getAll);
app.get('/recipes/:id', rescue(recipesController.getOne));

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: err.message });
});

module.exports = app;
