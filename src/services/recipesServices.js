const recipesModels = require('../models/recipesModels');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipesModels.createRecipes(name, ingredients, preparation, userId);
  console.log('========newRecipe============', newRecipe);
  return { recipe: newRecipe };
};

const getAllRecipes = async () => {
  const allRecipes = await recipesModels.getAllRecipes();
  return allRecipes;
};

const getRecipeById = async (id) => {
  const recipe = await recipesModels.getRecipeById(id);
  return recipe;
};

const editRecipeById = async (recipeId, userId, payload) => {
  const editedRecipe = await recipesModels.editRecipeById(recipeId, userId, payload);
  return editedRecipe;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
};
