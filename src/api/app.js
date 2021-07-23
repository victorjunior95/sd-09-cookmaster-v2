const express = require('express');
const bodyParse = require('body-parser');
const userRoute = require('./routes/userRoute');
const loginRoute = require('./routes/loginRoute');

const app = express();

app.use(bodyParse.json());

// Não remover esse end-point, ele é necessário para o avaliador 
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// rota inicial de usuarios
app.use('/users', userRoute);

// rota inicial de login
app.use('/login', loginRoute);

module.exports = app;
