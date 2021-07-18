const express = require('express');
const bodyParser = require('body-parser');
const { sendErrorMessage } = require('./middwares/errors');
const { validateToken } = require('./middwares/validateToken');
const usersController = require('./controllers/users');
const recipesController = require('./controllers/recipes');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.create);

app.post('/login', usersController.login);

app.post('/recipes', validateToken, recipesController.create);

app.get('/recipes', recipesController.getAll);

app.get('/recipes/:id', recipesController.getById);

app.put('/recipes/:id', validateToken, recipesController.edit);

app.delete('/recipes/:id', validateToken, recipesController.remove);

app.use(sendErrorMessage);

module.exports = app;
