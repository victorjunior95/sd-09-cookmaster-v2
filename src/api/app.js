const express = require('express');
const bodyParser = require('body-parser');

const routes = require('../controllers/routes');
const errorMiddleware = require('../middlewares/errorMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(routes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(errorMiddleware);

module.exports = app;
