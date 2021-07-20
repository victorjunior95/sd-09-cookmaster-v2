const express = require('express');
const UsersRouter = require('../routes/users');
const LoginRouter = require('../routes/login');
const RecipesRouter = require('../routes/recipes');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(express.static(`${__dirname}/uploads`));

app.use('/users', UsersRouter);
app.use('/login', LoginRouter);
app.use('/recipes', RecipesRouter);

module.exports = app;