require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const UserRoutes = require('../Routes/UsersRoutes');

const middlewares = require('../middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

UserRoutes(app);

app.use(middlewares.error);

// Não remover esse end-point, ele é necessário para o avaliador
module.exports = app;
// 
