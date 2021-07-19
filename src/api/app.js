const express = require('express');
const router = require('../routes/router');

// const UsersController = require('../controllers/UsersController');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);

// app.post('/users', UsersController.registerUser);

module.exports = app;
