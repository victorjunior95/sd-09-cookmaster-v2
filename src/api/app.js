const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../Controllers/userController');
const loginController = require('../Controllers/loginController');
const recipesController = require('../Controllers/recipesController');

const app = express();

app.get('/', (request, response) => {
  response.send('aaa');
});

app.use(bodyParser.json());

app.post('/users', userController.addUser);
app.post('/login', loginController);
app.post('/recipes', recipesController.addRecipe);

module.exports = app;
