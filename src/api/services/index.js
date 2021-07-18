const createUserServices = require('./createUserServices');
const loginServices = require('./loginServices');
const createRecipeServices = require('./createRecipeServices');
const getRecipesAllService = require('./getRecipesAllServices');
const getRecipeByIdService = require('./getRecipeByIdServices');
const updateRecipeService = require('./updateRecipeServices');
const deleteRecipeService = require('./deleteRecipeServices');
const updateUrlImageRecipeService = require('./updateUrlImageRecipeServices');

module.exports = {
  createUserServices,
  loginServices,
  createRecipeServices,
  getRecipesAllService,
  getRecipeByIdService,
  updateRecipeService,
  deleteRecipeService,
  updateUrlImageRecipeService,
};
