const Router = require('express').Router();
const { addRecipe, listRecipes, getRecipeById } = require('./recipes.controller');

Router.route('/')
  .get(listRecipes)
  .post(addRecipe);

Router.route('/:id')
  .get(getRecipeById);

module.exports = Router;
