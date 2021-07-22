const express = require('express');
const bodyParser = require('body-parser').json();

const userRoutes = require('../routes/usersRoutes');
const loginRoutes = require('../routes/loginRoutes');
const recipesRoutes = require('../routes/recipesRoutes');
const imagesRoutes = require('../routes/imagesRoutes');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRoutes);

app.use('/login', loginRoutes);

app.use('/recipes', recipesRoutes);

app.use('/images', imagesRoutes);

module.exports = app;
