const recipesModel = require('../models/recipesModel');
const { validateRecipe } = require('../middlewares/validateRecipe');

const createRecipe = async (name, ingredients, preparation) => {
const recipeIsValid = await validateRecipe(name, ingredients, preparation);
const recipe = await recipesModel.createRecipe(name, ingredients, preparation);

if (recipeIsValid !== true) return recipeIsValid;

  return recipe.ops[0];
};

const getAllRecipes = async () => {
  const result = await recipesModel.getAllRecipes();
  return result;
};

const getRecipesById = async (id) => {
  const result = await recipesModel.getRecipesById(id);
  if (!result) return null;
  return result;
};

const updateRecipe = async (id, data) => {
  const result = await recipesModel.updateRecipe(id, data);
  return result;
};

const deleteRecipe = async (id) => {
  const result = await recipesModel.deleteRecipe(id);
  return result;
};

const updateRecipeWithImage = async (id, image) => {
  const recipe = await recipesModel.updateRecipeWithImage(id, image);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipesById,
  updateRecipe,
  deleteRecipe,
  updateRecipeWithImage,
};