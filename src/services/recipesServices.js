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

const uploadImage = async (recipeId, image) => {
  const recipe = await recipesModels.getRecipeById(recipeId);

  const recipeUpDated = { ...recipe, image: `localhost:3000/${image.path}` };
  await recipesModels.uploadImage(recipeId, recipeUpDated);

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
