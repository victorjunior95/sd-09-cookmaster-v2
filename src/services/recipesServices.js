const recipesModels = require('../models/recipesModels');

const postNewRecipe = async (recipeInfo) => {
  const result = await recipesModels.postNewRecipe(recipeInfo);

  return result;
};

const getAllRecipes = async () => {
  const result = await recipesModels.getAllRecipes();

  return result;
};

const getRecipeById = async (id) => {
  const result = await recipesModels.getRecipeById(id);

  if (result.error) return { code: 404, message: 'recipe not found' };

  return result;
};

module.exports = {
  postNewRecipe,
  getAllRecipes,
  getRecipeById,
};
