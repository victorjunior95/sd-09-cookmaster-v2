const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createUser } = require('../controllers/users');
const { createLogin } = require('../controllers/login');
const { createRecipe } = require('../controllers/recipes');

const app = express();

app.use(bodyParser.json());

app.post('/users', createUser);
app.post('/login', createLogin);
app.post('/recipes', createRecipe);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send('');
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(errorMiddleware);

module.exports = app;
