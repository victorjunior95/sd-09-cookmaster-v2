require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const usersRouter = require('../routes/usersRouter');
const recipesRouter = require('../routes/recipesRouter');

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

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
}); // middleware error

module.exports = app;
