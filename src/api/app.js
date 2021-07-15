const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use('/', router);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;
