const express = require('express');
const path = require('path');

const erro = require('../middlewares/error');
const { login } = require('../controllers/login');
const user = require('../routes/users');
const recipes = require('../routes/recipes');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/login', login);
app.use('/users', user);
app.use('/recipes', recipes);

app.use(erro);

module.exports = app;