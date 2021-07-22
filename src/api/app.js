const express = require('express');
const bodyParser = require('body-parser');

const {
  createUserControl,
  loginControl,
} = require('./controllers/userControl');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUserControl);
app.post('/login', loginControl);

module.exports = app;
