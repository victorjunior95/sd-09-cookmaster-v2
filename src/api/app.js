const express = require('express');
const bodyParser = require('body-parser').json();
const errorMiddleware = require('../middlewares/errorMiddleware');
const usersController = require('../controllers/usersController');

const app = express();
app.use(bodyParser);
app.post('/users', errorMiddleware.validateUser, usersController.usersCreate);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador
app.use(errorMiddleware.errorMidd);

module.exports = app;