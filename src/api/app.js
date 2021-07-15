const express = require('express');
const router = require('../../routes/router');

const app = express();

app.use(router);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => { response.send(); });
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
