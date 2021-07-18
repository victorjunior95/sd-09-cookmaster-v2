const createUser = require('./createUser');
const getUserByEmail = require('./getUserByEmail');
const login = require('./login');
const createRecipe = require('./createRecipe');
const getRecipesAll = require('./getRecipesAll');
const getRecipeById = require('./getRecipeById');
const updateRecipe = require('./updateRecipe');
const deleteRecipe = require('./deleteRecipe');
const updateUrlImageRecipe = require('./updateUrlImageRecipe');

module.exports = {
  createUser,
  getUserByEmail,
  login,
  createRecipe,
  getRecipesAll,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateUrlImageRecipe,
};
