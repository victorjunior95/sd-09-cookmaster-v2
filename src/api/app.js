const express = require('express');

const bodyParser = require('body-parser');
// const path = require('path');
require('dotenv').config();
const users = require('./routes/routerUser');
const error = require('./middleware/error');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', users);

app.use(error);

module.exports = app;
