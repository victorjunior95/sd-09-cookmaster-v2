const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const routes = require('../routes');

const app = express();

app.use('/images', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(routes);

module.exports = app;
