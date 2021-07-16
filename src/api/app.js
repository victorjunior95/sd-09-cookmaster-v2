const express = require('express');
const rescue = require('express-rescue');
const usersController = require('../controllers/Users');
const loginControler = require('../controllers/login');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersController);
app.use('/login', rescue(loginControler));
app.use(errorMiddleware);

module.exports = app;
