const rescue = require('express-rescue');
const RecipesService = require('../services/Recipes');

const createRecipe = rescue(async (req, res) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const { result, code } = await RecipesService.createRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  res.status(code).json(result);
});

const getAllRecipes = rescue(async (req, res) => {
  const { result, code } = await RecipesService.getAllRecipes();
  res.status(code).json(result);
});

const getRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const { result, code } = await RecipesService.getRecipeById(id);
  res.status(code).json(result);
});

module.exports = { createRecipe, getAllRecipes, getRecipeById };