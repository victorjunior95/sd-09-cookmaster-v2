const rescue = require('express-rescue');
const { newRecipeService, getAllRecipesService } = require('../services/recipeServices');

const newRecipe = rescue(async (req, res, _next) => {
  const token = req.headers.authorization;
  const recipeData = req.body;
  const response = await newRecipeService(recipeData, token);
  if (response.error) return res.status(response.status).json({ message: response.error });
  
  return res.status(201).json(response);
});

const getAllRecipes = rescue(async (_req, res, _next) => {
  const allRecipes = await getAllRecipesService();
  return res.status(200).json(allRecipes);
});

module.exports = {
  newRecipe,
  getAllRecipes,
};