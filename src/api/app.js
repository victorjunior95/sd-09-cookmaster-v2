const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../middlewares/errorMiddleware');
const usersController = require('../controllers/usersController');

const app = express();

app.use(bodyParser.json());

app.post('/users', usersController.createUser);
app.post('/login', usersController.loginUser);

app.use(errorMiddleware);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
