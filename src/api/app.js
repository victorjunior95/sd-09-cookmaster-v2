const express = require('express');

const app = express();

const routes = require('./routes');

const apiRoutes = express.Router();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

apiRoutes.post('/users', routes.createUsers);

module.exports = app;
