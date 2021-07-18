const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const getAllRecipes = async () => recipesModel.getAll();

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await recipesModel.findById(id);
  
  if (!recipe) return null;

  return recipe;
};

const updateRecipeById = async (id, recipeData, userId) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await recipesModel.updateById(id, recipeData, userId);
  
  if (!recipe) return null;

  return recipe;
};

const deleteRecipeById = async (recipeId, user) => {
  if (!ObjectId.isValid(recipeId)) return null;

  const { role, id } = user;

  const recipe = await recipesModel.findById(recipeId);

  if (recipe.userId === id || role === 'admin') {
    await recipesModel.deleteById(recipeId);
  } else {
    return { message: 'something bad happened' };
  }
};

const createRecipe = async (name, ingredients, preparation, userId) =>
  recipesModel.create(name, ingredients, preparation, userId);

const uploadRecipeImage = async (id, image) => {
  if (!ObjectId.isValid(id)) return null;

  await recipesModel.uploadImage(id, image);

  // return doUpload;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  createRecipe,
  uploadRecipeImage,
};
