const express = require('express');
const recipesService = require('../services/recipesService');

const routerRecipes = express.Router();

routerRecipes.post('/', async (req, res, next) => {
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

module.exports = routerRecipes;