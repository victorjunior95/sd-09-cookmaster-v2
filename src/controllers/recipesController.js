const express = require('express');
const authToken = require('../middlewares/authToken');

const recipesMW = require('../middlewares/recipesMW');

const RecipesRouter = express.Router();

RecipesRouter.get('/', recipesMW.getAllRecipes);

RecipesRouter.post('/',
  authToken,
  recipesMW.validateRecipe,
  recipesMW.postRecipe);

module.exports = RecipesRouter;