const express = require('express');

const app = express();
const userRoutes = require('../routes/userRoutes');
const loginRoutes = require('../routes/loginRoutes');
const recipeRoutes = require('../routes/recipeRoutes');

//  
app.use(express.json());
app.use(userRoutes);
app.use(loginRoutes);
app.use(recipeRoutes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
