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

const updateRecipeById = async (id, name, ingredients, preparation) => {
  const updatedRecipe = await recipesModels.updateRecipeById(id, name, ingredients, preparation);
  return updatedRecipe;
};

const deleteRecipeById = async (id) => {
  const deletedRecipe = await recipesModels.deleteRecipeById(id);
  return deletedRecipe;
};

const uploadRecipeImage = async (id, filename) => {
  const imgPath = `localhost:3000/src/uploads/${filename}`;
  const uploadedImage = await recipesModels.uploadRecipeImage(id, imgPath);
  return uploadedImage;
};

module.exports = {
  insertRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  uploadRecipeImage,
};
