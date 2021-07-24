const express = require('express');
const bodyParser = require('body-parser');

const usersControllers = require('../../controllers/usersControllers');

const app = express();

app.use(bodyParser.json());

app.post('/users', usersControllers.insertUser);

app.post('/login', usersControllers.userLogin);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
