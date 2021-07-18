const bodyParser = require('body-parser').json();

const express = require('express');

const users = require('../routes/usersRoute');
const login = require('../routes/loginRoute');
const recipes = require('../routes/recipesRoute');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(bodyParser);

app.use('/users', users);

app.use('/login', login);

app.use('/recipes', recipes);

// Não remover esse end-point, ele é necessário para o avaliador 
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(errorMiddleware);

module.exports = app;
