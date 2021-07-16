const express = require('express');
const { resolve, join } = require('path');
const usersController = require('../controllers/Users');
const loginController = require('../controllers/Login');
const recipesController = require('../controllers/Recipes');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersController);
app.use('/login', loginController);
app.use('/recipes', recipesController);
app.use('/images', express.static(resolve(join(__dirname, '..'), 'uploads')));

module.exports = app;
