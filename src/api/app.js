const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../middleware/errorMiddleware');
const loginRouter = require('../router/login');
const userRoute = require('../router/users');
const { createUser } = require('../controllers/users');

const app = express();

app.use(bodyParser.json());

app.post('/users', userRoute);
app.post('/login', loginRouter);
app.post('/recipes', createUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send('');
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(errorMiddleware);

module.exports = app;
