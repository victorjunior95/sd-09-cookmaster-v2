const express = require('express');
const bodyParser = require('body-parser');
const user = require('../routes/userRoutes');
const login = require('../routes/loginRoutes');
const recipes = require('../routes/recipesRoutes');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', user);
app.use('/login', login);
app.use('/recipes', recipes);
app.use('/images', express.static('../uploads/'));

app.use(({ status, message }, _req, res, _next) => {
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log('Server localhost:3000 is Online');
});

module.exports = app;
