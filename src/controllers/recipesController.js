const rescue = require('express-rescue');
const Recipes = require('../services/recipesServices');

const createRecipes = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipes = await Recipes.createRecipe(name, ingredients, preparation, req.userId);

  return res.status(201).json(recipes);
});

module.exports = {
  createRecipes,
};
