const express = require('express');
const rescue = require('express-rescue');
const bodyParse = require('body-parser');

const controllers = require('./controllers');
const middlewares = require('./middlewares');

const app = express();

app.use(bodyParse.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', rescue(controllers.createUserController));
app.post('/login', rescue(controllers.loginController));

app.use(middlewares.createError, middlewares.error);

module.exports = app;
