const express = require('express');
const path = require('path');

const app = express();

const userRoute = require('../routes/user');
const loginRoute = require('../routes/login');
const recipeRoute = require('../routes/recipe');

app.use(express.json());
app.use('/users', userRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipeRoute);
app.use(express.static(path.join(`${__dirname}/uploads`)));
/* https://app.betrybe.com/course/back-end/autenticacao-e-upload-de-arquivos/nodejs-upload-de-arquivos-com-%60multer%60/4619ea0e-6322-4165-b33f-64cef49676af/conteudo/a66c00b4-d0d3-40e1-a4f6-ad01d3e4913e/show-me-the-code/d2be412b-7812-4a79-9b72-a78cc8bd1326?use_case=side_bar */

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
