const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createUser } = require('../controllers/users');

const app = express();

app.use(bodyParser.json());

app.use('/users', createUser);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send('');
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(errorMiddleware);

module.exports = app;
