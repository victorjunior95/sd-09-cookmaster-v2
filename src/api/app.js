const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../Controllers/userController');
const loginController = require('../Controllers/login');

const app = express();

app.get('/', (request, response) => {
  response.send('aaa');
});

app.use(bodyParser.json());

app.post('/users', userController.addUser);
app.post('/login', loginController);

module.exports = app;
