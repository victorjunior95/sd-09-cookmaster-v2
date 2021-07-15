const express = require('express');
const bodyParser = require('body-parser');
const { createUserController } = require('../controllers/createUserController');
const { errorGeneric } = require('../middlware/errorGeneric');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUserController);

app.use(errorGeneric);

module.exports = app;
