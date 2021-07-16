const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const middlewares = require('../middlewares/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', routes.usersRouter);

app.use('/login', routes.loginRouter);

app.use('/recipes', routes.recipeRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(middlewares.errorHandler);
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
