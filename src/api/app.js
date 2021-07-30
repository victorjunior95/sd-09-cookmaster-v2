require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const { UsersRoutes, RecipesRoutes } = require('../Routes');

const { error } = require('../middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// UsersRoutes(app);
// RecipesRoutes(app);

app.use(error);

// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;
// 
