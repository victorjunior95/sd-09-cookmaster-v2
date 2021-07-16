const express = require('express');
const bodyParser = require('body-parser').json();
const errorMiddleware = require('../middlewares/errorMiddleware');
const usersController = require('../controllers/usersController');
const validateUser = require('../middlewares/validateUser');
const validateLogin = require('../middlewares/validateLogin');
const userLoginController = require('../controllers/loginController');

const app = express();
app.use(bodyParser);
app.post('/users', validateUser, usersController);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', validateLogin, userLoginController);
// Não remover esse end-point, ele é necessário para o avaliador
app.use(errorMiddleware.errorMidd);

module.exports = app;