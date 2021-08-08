const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const router = require('../router');
const middlewares = require('../middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(middlewares.error);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
