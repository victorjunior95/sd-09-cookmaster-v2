const express = require('express');
const path = require('path');
const bodyParser = require('body-parser').json();

const { usersRoutes } = require('./routes');
const { handleError } = require('../../middlewares');

const app = express();

app.use(bodyParser);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/users', usersRoutes);

app.use(handleError);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
