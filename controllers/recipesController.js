const rescue = require('express-rescue');
const recipesService = require('../services/recipesServices');

const addRecipe = rescue(async (req, res) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;

  const recipe = await recipesService.addRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  return res.status(201).json(recipe);
});

const listRecipes = rescue(async (_req, res) => {
  const recipes = await recipesService.listRecipes();

  return res.status(200).json(recipes);
});

const getRecipe = rescue(async (req, res, next) => {
  const { id } = req.params;

  const recipe = await recipesService.getRecipe(id);

  if (!recipe) {
    return next({
      status: 404,
      message: 'recipe not found',
    });
  }

  return res.status(200).json(recipe);
});

module.exports = {
  addRecipe,
  listRecipes,
  getRecipe,
};
