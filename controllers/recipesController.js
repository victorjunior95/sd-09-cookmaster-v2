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

const getRecipes = rescue(async (req, res) => {
  const recipes = await recipesService.getRecipes();

  return res.status(200).json(recipes);
});

module.exports = {
  addRecipe,
  getRecipes,
};
