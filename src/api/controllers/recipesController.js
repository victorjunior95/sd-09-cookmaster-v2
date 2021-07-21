const recipesService = require('../services/recipesService');

const registerRecipe = async (req, res) => {
  const newRecipe = req.body;
  const { authorization } = req.headers;
  const { status,
    registeredRecipe } = await recipesService.registerRecipe(newRecipe, authorization);
  res.status(status).json({ recipe: registeredRecipe });
};

const getAllRecipes = async (_req, res) => {
  const { status, recipes } = await recipesService.getAllRecipes();
  res.status(status).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { status, recipe } = await recipesService.getRecipeById(id);
  res.status(status).json(recipe);
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
};
