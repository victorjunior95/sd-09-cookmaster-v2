const express = require('express');
const usersServices = require('../controllers/usersControllers'); // requisito 1

const app = express(); // requisito 1 
app.use(express.json()); // requisito 1 
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use('/users', usersServices); // requisito 1 
module.exports = app;
