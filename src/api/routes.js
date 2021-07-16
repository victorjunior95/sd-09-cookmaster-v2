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

// 4 - Crie um endpoint para a listagem de receitas
recipeRouter.get('/', recipesController.getAllRecipes);

// 5 - Crie um endpoint para visualizar uma receita específica
recipeRouter.get('/:id', recipesController.getRecipeById);

// 7 - Crie um endpoint para a edição de uma receita
recipeRouter.put('/:id', middlewares.authCheck, recipesController.updateRecipe);

// 8 - Crie um endpoint para a exclusão de uma receita
recipeRouter.delete('/:id', middlewares.authCheck, recipesController.deleteRecipe);

module.exports = {
  usersRouter,
  recipeRouter,
  loginRouter,
};