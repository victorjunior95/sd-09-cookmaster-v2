const express = require('express');
const { validadeRecipes } = require('../middlewares/validades');
const authToken = require('../middlewares/authToken');
const Recipes = require('../controllers/recipes');

const RecipeRouter = express.Router();

RecipeRouter.post('/', validadeRecipes, authToken, Recipes.createRecipe);

RecipeRouter.get('/', Recipes.getAll);

module.exports = RecipeRouter;