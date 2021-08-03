const express = require('express');
const bodyParser = require('body-parser');
const User = require('../../controller/User');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', User.create);

module.exports = app;
