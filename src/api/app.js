const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const path = require('path');
const routerUser = require('../routers/user');
const routerRecipes = require('../routers/recipes');
const errorHandling = require('../middlewares/errorHandling');
const loginController = require('../controllers/loginController');
// const recipesController = require('../controllers/recipesController');

const app = express();

app.use(bodyParser.json());

app.use('/users', routerUser);
app.post('/login', rescue(loginController.login));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// app.get('/images/:id', rescue(recipesController.getImage));
app.use('/recipes', routerRecipes);
app.use(errorHandling);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
