const recipesModels = require('../../models/recipes');
const validateExists = require('./validateExists');

const insertRecipe = async (newRecipe) => {
  const insertedRecipe = await recipesModels.insertRecipe(newRecipe);
  return insertedRecipe;
};

const getAllRecipes = async () => {
  const allRecipes = await recipesModels.getAllRecipes();
  return allRecipes;
};

const getRecipeById = async (id) => {
  const recipeById = await recipesModels.getRecipeById(id);
  const recipeNotFound = await validateExists(recipeById);
  if (recipeNotFound) return recipeNotFound;
  return recipeById;
};

// const updateRecipeById = async (id, name, ingredients, preparation) => {
//   const updatedRecipe = await recipesModels.updateRecipeById(id, name, ingredients, preparation);
//   // console.log('SERVICE UPDATE', updatedRecipe);
//   return updatedRecipe;
// };

module.exports = {
  insertRecipe,
  getAllRecipes,
  getRecipeById,
};
