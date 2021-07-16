const recipesModel = require('../models/recipesModel');
const { validateRecipe } = require('./validations');

const createRecipe = async (recipe) => {
  validateRecipe(recipe);
  const result = await recipesModel.createRecipe(recipe);
  return { recipe: result };
};

const getAllRecipes = async () => {
  const result = await recipesModel.getAllRecipes();
  return result;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
