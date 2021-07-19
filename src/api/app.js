const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../middleware/errorMiddleware');
const userRoute = require('../router/users');
const loginRouter = require('../router/login');
const recipesRouter = require('../router/recipes');

const app = express();

app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send('');
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(errorMiddleware);

module.exports = app;
