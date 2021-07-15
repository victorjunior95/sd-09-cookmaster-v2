const express = require('express');
const userRoutes = require('./Routes/user');
const loginRoutes = require('./Routes/login');
const recipeRoutes = require('./Routes/recipe');

const app = express();
const port = 3000;

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/recipe', recipeRoutes);

app.listen(port, () => console.log(`CookMaster Server listening on port ${port}!`));

module.exports = app;
