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

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipesById,
};