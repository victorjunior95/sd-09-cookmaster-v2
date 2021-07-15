const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', routes.usersRouter);

app.use('/login', routes.loginRouter);

app.use('/recipes', routes.recipeRouter);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use(errorHandler);
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
