const recipeService = require('../services/recipeService');

const registerRecipe = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const newRecipe = await recipeService.registerNewRecipe(name, ingredients, preparation, token);
  return res.status(201).json({ recipe: newRecipe });
};

const getAllRecipes = async (req, res, _next) => {
  const result = await recipeService.getRecipes();
  console.log(result);
  res.status(200).json(result);
};

module.exports = {
  registerRecipe,
  getAllRecipes,
};
