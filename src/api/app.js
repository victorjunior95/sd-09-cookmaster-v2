const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../middlewares/auth');
const userRoutes = require('../routes/userRoutes');
const recipeRoutes = require('../routes/recipeRoutes');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send('hello world');
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.post('/login', auth);

module.exports = app;
