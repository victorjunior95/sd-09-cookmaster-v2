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
  const { id } = data;
  const recipeFound = await recipesModels.getRecipeById(id);

  if (recipeFound === null || recipeFound.error) return { code: 404, message: 'recipe not found' };

  const { userId, role } = data;

  if (recipeFound.userId !== userId && role !== 'admin') {
    return { code: 401, message: 'Unauthorized' };
  }

  const { name, ingredients, preparation } = data;

  const result = await recipesModels.updateRecipe({ id, name, ingredients, preparation });

  return result;
};

module.exports = {
  postNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
