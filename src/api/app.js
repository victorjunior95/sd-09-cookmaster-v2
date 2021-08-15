const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
const router = require('../routers/router');

const error = require('../middleware/error');

const app = express();
app.use(bodyParse.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(router);
app.use(error);

module.exports = app;
