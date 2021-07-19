const express = require('express');
const bodyParser = require('body-parser');

const usersRoute = require('../routes/usersRoute');
const loginRoute = require('../routes/loginRoute');
const recipesRoute = require('../routes/recipesRoute');
const imagesRoute = require('../routes/imagesRoute');

const HTTP_STATUS_INTERNAL_SERVER_ERROR = 422;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipesRoute);
app.use('/images', imagesRoute);

app.use((err, _req, res, _next) => {
  if (err.err) return res.status(err.status).json({ message: err.err.message });
  res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: err });
});

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
