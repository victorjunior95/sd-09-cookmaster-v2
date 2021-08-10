const Router = require('express').Router();
const {
  addRecipe,
  listRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
} = require('./recipes.controller');

Router.route('/')
  .get(listRecipes)
  .post(addRecipe);

Router.route('/:id')
  .put(updateRecipeById)
  .delete(deleteRecipeById)
  .get(getRecipeById);

module.exports = Router;
