const bodyParser = require('body-parser');
const express = require('express');
const errorMiddleware = require('./middlewares/error');
require('dotenv').config();
const { login } = require('./controllers/users');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', require('./routes/users'));

app.post('/login', login);

app.use(errorMiddleware);

module.exports = app;
