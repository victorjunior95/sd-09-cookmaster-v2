require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const { errorTreatment } = require('./middlewares');

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/uploads`));

app.use('/', routes);

app.use(errorTreatment);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
