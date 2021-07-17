const createUserController = require('./createUserControllers');
const loginController = require('./loginControllers');
const createRecipeController = require('./createRecipeControllers');
const getRecipesAllController = require('./getRecipesAllControllers');
const getRecipeByIdController = require('./getRecipeByIdControllers');

module.exports = {
  createUserController,
  loginController,
  createRecipeController,
  getRecipesAllController,
  getRecipeByIdController,
};
