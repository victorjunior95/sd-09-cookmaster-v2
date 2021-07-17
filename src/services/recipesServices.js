const recipesModels = require('../models/recipesModels');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipesModels.createRecipes(name, ingredients, preparation, userId);
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

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
};
