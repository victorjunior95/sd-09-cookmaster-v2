require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const Middlewares = require('./middlewares');

const app = express();

app.use(bodyParser.json());
app.use('/users', routes.RoutesUsers);
app.use('/login', routes.RouteLogin);
app.use('/recipes', routes.RoutesRecipes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(Middlewares.errorMiddlewares);

module.exports = app;
