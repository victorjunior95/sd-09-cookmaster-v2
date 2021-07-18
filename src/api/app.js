const express = require('express');
const bodyParser = require('body-parser').json();
// const cors = require('cors');
const errorMiddleware = require('../middlewares/errorMiddleware');
const usersController = require('../controllers/usersController');
const validateUser = require('../middlewares/validateUser');
const validateLogin = require('../middlewares/validateLogin');
const userLoginController = require('../controllers/loginController');

const app = express();

// app.use(
//   cors({
//     origin: `http://localhost:${PORT}`,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Authorization'],
//   }),
//   );

app.use(bodyParser);
// app.use(bodyParser.urlencoded({ extended: true }));
app.post('/users', validateUser, usersController);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', validateLogin, userLoginController);
// Não remover esse end-point, ele é necessário para o avaliador
app.use(errorMiddleware.errorMidd);

module.exports = app;