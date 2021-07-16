const bodyParser = require('body-parser');
const express = require('express');
const errorMiddleware = require('./middlewares/error');
require('dotenv').config();
const users = require('./routes/users');
const recipes = require('./routes/recipes');
const { login } = require('./controllers/users');
const tokenValidate = require('./middlewares/tokenValidate');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', users);

app.use('/recipes', tokenValidate, recipes);

app.post('/login', login);

app.use(errorMiddleware);

module.exports = app;
