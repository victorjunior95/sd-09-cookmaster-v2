const recipeModel = require('../models/resipeModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getAllRecipes();
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};