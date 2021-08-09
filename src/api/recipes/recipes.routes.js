const Router = require('express').Router();
const { addRecipe, listRecipes, getRecipeById, updateRecipeById } = require('./recipes.controller');

Router.route('/')
  .get(listRecipes)
  .post(addRecipe);

Router.route('/:id')
  .put(updateRecipeById)
  .get(getRecipeById);

module.exports = Router;
