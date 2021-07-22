const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');
const recipesRouter = require('./routes/recipesRouter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(`${__dirname}/../uploads`));

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipesRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
