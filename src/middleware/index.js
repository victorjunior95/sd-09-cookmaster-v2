const createUser = require('./createUser_Middleware');
const getAllRecipes = require('./getAllRecipes_Middleware');
const login = require('./login_Middleware');
const authentication = require('./authentication_Middleware');
const insertRecipe = require('./insertRecipe_Middleware');
const getRecipeById = require('./getRecipeById._Middleware');
const deleteRecipeById = require('./deleteRecipeById_Middleware');
const updateRecipeById = require('./updateRecipeById_Middleware');

module.exports = {
  createUser,
  getAllRecipes,
  login,
  authentication,
  insertRecipe,
  getRecipeById,
  deleteRecipeById,
  updateRecipeById,
};
