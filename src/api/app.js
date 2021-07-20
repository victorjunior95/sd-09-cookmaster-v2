const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

// Users
const User = require('../controllers/user');

app.route('/users').post(User.create);

// Recipes

// Error
const errorMiddleware = require('../middlewares/error');

app.use(errorMiddleware);

module.exports = app;
