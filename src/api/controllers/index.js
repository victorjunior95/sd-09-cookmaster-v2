const createUserController = require('./createUserControllers');
const loginController = require('./loginControllers');
const createRecipeController = require('./createRecipeControllers');
const getRecipesAllController = require('./getRecipesAllControllers');
const getRecipeByIdController = require('./getRecipeByIdControllers');
const updateRecipeController = require('./updateRecipeCrontrollers');

module.exports = {
  createUserController,
  loginController,
  createRecipeController,
  getRecipesAllController,
  getRecipeByIdController,
  updateRecipeController,
};
