const express = require('express');
const bodyParser = require('body-parser');
const usersRoute = require('../routes/usersRoute');
const loginRoute = require('../routes/loginRoute');
const recipesRoute = require('../routes/recipesRoute');

const app = express();
// codigo do bodyparser consultado no https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipesRoute);

module.exports = app;
