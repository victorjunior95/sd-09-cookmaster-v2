const recipesModel = require('../models/recipesModel');
const { validateRecipe } = require('./validations');
const { recipeNotFound } = require('./errorsMessages');

const createRecipe = async (recipe) => {
  validateRecipe(recipe);
  const result = await recipesModel.createRecipe(recipe);
  return { recipe: result };
};

const getAllRecipes = async () => {
  const result = await recipesModel.getAllRecipes();
  return result;
};

const findOneRecipe = async (id) => {
  if (id.length !== 24) throw recipeNotFound;
  const result = await recipesModel.findOneRecipeById(id);
  if (!result) throw recipeNotFound;
  return result;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findOneRecipe,
};
