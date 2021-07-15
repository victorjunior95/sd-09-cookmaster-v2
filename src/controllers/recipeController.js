const recipeService = require('../services/recipeService');

const createRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const { userId } = req;

  const newRecipe = await recipeService.validateNewRecipe(
    name,
    ingredients,
    preparation,
  );

  return newRecipe.message
    ? next(newRecipe)
    : res.status(201).json({ recipe: { userId, ...newRecipe } });
};

const getAllRecipes = async (_req, res, _next) => {
  const allRecipes = await recipeService.getAllRecipes();
  return res.json(allRecipes);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
