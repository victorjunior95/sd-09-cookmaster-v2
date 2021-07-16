const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('../routes/routes');

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(router);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;
