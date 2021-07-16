const express = require('express');
const bodyParser = require('body-parser').json();
const errorMiddleware = require('../middlewares/error');
const Users = require('../Controllers/usersController');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', Users.userCreate);
app.post('/login', Users.userLogin);

app.use(errorMiddleware); 

module.exports = app;
