const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const path = require('path');

const {
  errorHandling,
} = require('./services/services');

const {
  loginControl,
} = require('./controllers/userControl');

const routerUser = require('./routers/user');
const routerRecipes = require('./routers/recipe');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador


app.use('/users', routerUser);
app.post('/login', rescue(loginControl));

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/recipes', routerRecipes);

app.use(errorHandling);

module.exports = app;
