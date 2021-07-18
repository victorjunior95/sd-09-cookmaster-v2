const express = require('express');
const recipesService = require('../services/recipesService');
const validateToken = require('../middlewares/validateToken');

const routerRecipes = express.Router();

routerRecipes.post('/', validateToken, async (req, res, next) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
try {
  const recipeCreated = await recipesService.create(name, ingredients, preparation, _id);
  if (recipeCreated.err) {
    return next(recipeCreated);
  }
  return res.status(recipeCreated.status).json({ recipe: recipeCreated.recipe });
  } catch (error) {
    return next(error);
  }
});

routerRecipes.get('/', async (_req, res, next) => {
  try {
    const recipes = await recipesService.listAllRecipes();
    return res.status(recipes.status).json(recipes.recipesAll);
  } catch (error) {
    return next(error);
  }
}); 
module.exports = routerRecipes;