const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const usersRouter = require('./routers/usersRouter');
const loginRouter = require('./routers/loginRouter');
const recipesRouter = require('./routers/recipesRouter');

const app = express();
app.use(bodyParser.json());
// converte o corpo da requisição de json p/ javascript

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// path.join "traduz" o path dependendo do sistema operacional (pode ter separador de pasta diferentes)
// Sempre que receber uma request, o express vai verificar se o caminho da request é o nome de um arquivo
// que existe em `uploads`. Se for, o express envia o conteúdo desse arquivo e encerra a response.

app.use((error, _req, res, _next) => {
  console.log(error);
  res.status(error.status).json(error.err);
});

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
