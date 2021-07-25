const express = require('express');

const app = express();

const userRoute = require('../routes/user');
const loginRoute = require('../routes/login');
const recipeRoute = require('../routes/recipe');

app.use(express.json());
app.use('/users', userRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipeRoute);

app.use((error, _request, response, _next) => {
  /* LEMBRAR DE ARRUMAR ESSE ERRO - RAFA REIS ME AJUDOU A TRATAR PROVISORIAMENTE */
  if (!error.status) {
    return response.status(401).json(error);
  }
  console.log(error);
  response.status(error.status).json(error.err);
});

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
