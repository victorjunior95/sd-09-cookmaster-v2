const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', require('../controllers/usersController'));
app.use('/recipes', require('../controllers/recipesController'));
app.use('/login', require('../controllers/loginController'));
app.use('/images', require('../controllers/imagesController'));

module.exports = app;
