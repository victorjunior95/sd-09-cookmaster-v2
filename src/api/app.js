const express = require('express');
const bodyParser = require('body-parser');

const routes = require('../routes');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador.
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador.

app.use(routes);

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json(err.message);
  res.status(500).json({ message: `Internal Error: ${err.message}` });
});

module.exports = app;
