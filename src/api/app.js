const express = require('express');

const app = express();

const userRoute = require('../routes/user');
const loginRoute = require('../routes/login');

app.use(express.json());
app.use('/users', userRoute);
app.use('/login', loginRoute);

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(err.status).json(err.err);
});

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
