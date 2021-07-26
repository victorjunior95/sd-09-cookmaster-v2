const express = require('express');
const recipesService = require('../services/recipesService');
const middlewares = require('../middlewares');

const routerRecipes = express.Router();

routerRecipes.post('/', middlewares.validateToken, async (req, res, next) => {
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

routerRecipes.put('/:id',
  middlewares.validateToken,
  middlewares.validateRoleUser,
  async (req, res, next) => {
    const { id } = req.params;
    const recipeAlter = req.body;
    try {
      const recipe = await recipesService.updateRecipesById(id, recipeAlter);
      return res.status(recipe.status).json(recipe.recipeUpdate);
    } catch (error) {
      next(error);
    }
  });

routerRecipes.delete('/:id',
  middlewares.validateToken,
  middlewares.validateRoleUser,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const recipe = await recipesService.deleteRecipeById(id);
      return res.status(recipe.status).json();
    } catch (error) {
      return next(error);
    }
  });

routerRecipes.put('/:id/image', middlewares.validateToken,
middlewares.uploadPicture);

module.exports = routerRecipes;
