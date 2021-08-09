const Router = require('express').Router();
const { addRecipe, listRecipes } = require('./recipes.controller');

Router.route('/')
  .get(listRecipes)
  .post(addRecipe);

module.exports = Router;
