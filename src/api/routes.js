const express = require('express');
const middlewares = require('../middlewares/index');

// import de controllers
const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');

// Rotas de /user
const usersRouter = express.Router();
// 1 - Crie um endpoint para o cadastro de usuários
usersRouter.post('/', middlewares.validateNewUser, usersController.postNewUser);

// Rotas de /login
const loginRouter = express.Router();
// 2 - Crie um endpoint para o login de usuários
loginRouter.post('/', middlewares.validateLoginInput, loginController.postLogin);

// Rotas de /recipe
const recipeRouter = express.Router();
// 3 - Crie um endpoint para o cadastro de receitas
recipeRouter.post('/', middlewares.authCheck, middlewares.validateRecipeInput,
  recipesController.postNewRecipe);

recipeRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'estamos no /recipes get',
  });
});

recipeRouter.get('/:id', (req, res) => {
  res.status(200).json({
    message: 'estamos no /recipes/:id get',
  });
});

recipeRouter.put('/:id', (req, res) => {
  res.status(200).json({
    message: 'estamos no /recipes/:id put',
  });
});

recipeRouter.delete('/:id', (req, res) => {
  res.status(200).json({
    message: 'estamos no /recipes/:id delete',
  });
});

module.exports = {
  usersRouter,
  recipeRouter,
  loginRouter,
};