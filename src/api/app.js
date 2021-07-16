require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const usersRouter = require('../routes/usersRouter');
const recipesRouter = require('../routes/recipesRouter');
const imagesRouter = require('../routes/imagesRouter');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/images', imagesRouter);

app.use(errorMiddleware);

module.exports = app;
