const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/router');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);

app.use((err, _req, res, _next) => {
  if (err.message) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
