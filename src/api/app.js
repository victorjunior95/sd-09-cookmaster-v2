const express = require('express');

const app = express();

app.use(express.json());

const userRouter = require('../routers/userRouter');
const loginRouter = require('../routers/loginRouter');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(userRouter);
app.use(loginRouter);

module.exports = app;
