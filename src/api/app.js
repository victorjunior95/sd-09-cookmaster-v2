const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('../routes/routes');

const app = express();
app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use(router);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
