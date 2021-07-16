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

  if (result === null || result.error) return { code: 404, message: 'recipe not found' };

  return result;
};

const updateRecipe = async (data) => {
  const result = await recipesModels.updateRecipe(data);

  if (result.code) return result;

  return result;
};

const deleteRecipe = async (data) => {
  const result = await recipesModels.deleteRecipe(data);

  return result;
};

const postRecipeImage = async (id) => {
  const result = await recipesModels.postRecipeImage(id);

  return result;
};

module.exports = {
  postNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  postRecipeImage,
};
