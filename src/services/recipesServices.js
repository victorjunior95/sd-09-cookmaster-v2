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

const editRecipeById = async (recipeId, userId, payload) => {
  const editedRecipe = await recipesModels.editRecipeById(recipeId, userId, payload);
  return editedRecipe;
};

const deleteRecipeById = async (recipeId) => {
  await recipesModels.deleteRecipeById(recipeId);
};

const uploadImage = async (recipeId, path) => {
  const recipe = await recipesModels.getRecipeById(recipeId);
  const image = { image: `localhost:3000/${path}` };

  await recipesModels.uploadImage(recipeId, image);

  const recipeUpDated = { ...recipe, ...image };
  return recipeUpDated;
};

// const getRecipeImagesById = async (imageId) => {
//   const recipeImagesById = await recipesModels.getRecipeImagesById(imageId);
//   return recipeImagesById;
// };

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  // getRecipeImagesById,
  uploadImage,
};
