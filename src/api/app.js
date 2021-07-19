const express = require('express');
const path = require('path');

const app = express();

// 10 - Crie um endpoint para acessar a imagem de uma receita
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
