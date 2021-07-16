const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routers/router');

const app = express();
app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => response.send('ola mundo!!'));
// Não remover esse end-point, ele é necessário para o avaliador
// copiando todas as rotas criadas no router e 
// devolvendo aqui no app
app.use(router);
module.exports = app; 
