const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../middlewares/errorMiddleware');
const auth = require('../middlewares/authMiddleware');
const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');

const app = express();

app.use(bodyParser.json());

app.post('/users', usersController.createUser);
app.post('/login', usersController.loginUser);

app.post('/recipes', auth, recipesController.createRecipe);
app.get('/recipes', recipesController.getRecipes);
app.get('/recipes/:id', recipesController.getRecipes);

app.use(errorMiddleware);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
