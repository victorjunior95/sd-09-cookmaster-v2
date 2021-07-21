const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routers/usersRouter');
const loginRouter = require('./routers/loginRouter');

const app = express();
app.use(bodyParser.json());
// converte o corpo da requisição de json p/ javascript

app.use('/users', usersRouter);
app.use('/login', loginRouter);

app.use((error, _req, res, _next) => {
  console.log(error);
  res.status(error.status).json(error.err);
});

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
