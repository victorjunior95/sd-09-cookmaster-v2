const express = require('express');
const recipesService = require('../services/recipesService');
const validateToken = require('../middlewares/validateToken');

const routerRecipes = express.Router();

routerRecipes.post('/', validateToken, async (req, res, next) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  try {
    const recipeCreated = await recipesService.create(
      name,
      ingredients,
      preparation,
      _id,
    );
    if (recipeCreated.err) {
      return next(recipeCreated);
    }
    return res
      .status(recipeCreated.status)
      .json({ recipe: recipeCreated.recipe });
  } catch (error) {
    return next(error);
  }
});

routerRecipes.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipe = await recipesService.getRecipeById(id);
    if (recipe.err) {
      return next(recipe);
    }
    return res.status(recipe.status).json(recipe.recipeById);
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

routerRecipes.put('/:id', validateToken, async (req, res, next) => {
  const { _id, role } = req.user;
  const { id } = req.params;
  const recipeAlter = req.body;
  try {
    const recipe = await recipesService
    .updateRecipesByIdOrByUser(_id, id, recipeAlter, role);
    if (recipe.err) return next(recipe);
    return res.status(recipe.status).json(recipe.recipeUpdate);
  } catch (error) {
    next(error);
  }
});

module.exports = routerRecipes;
