const recipeModel = require('../models/recipeModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) {
    return { message: 'recipe not found' };
  }
  return recipe;
};

const updateRecipe = async (productData) => {
  const updatedRecipe = await recipeModel.updateRecipe(productData);
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const deletedRecipe = await recipeModel.deleteRecipe(id);
  return deletedRecipe;
};

const updateRecipeImage = async (id, filename) => {
  const urlImage = await recipeModel.updateRecipeImage(id, filename);
  return urlImage;
};

const getRecipeImage = async (imageId) => {
  const image = await recipeModel.getRecipeImage(imageId);
  return image;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
  getRecipeImage,
};