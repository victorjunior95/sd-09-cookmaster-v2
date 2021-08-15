const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../controllers/users');
const error = require('../middlewares/error');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/users', Users.create);
app.post('/login', Users.login);

app.post('/recipes');

app.use(error);

module.exports = app;
