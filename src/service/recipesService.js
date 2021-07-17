const recipesModel = require('../models/recipesModel');
const { validateRecipe, validateRecipeOwnerOrAdmin } = require('./validations');
const { recipeNotFound } = require('./errorsMessages');

const createRecipe = async (userId, recipe) => {
  validateRecipe(recipe);
  const recipeToCreate = { ...recipe, userId };
  const result = await recipesModel.createRecipe(recipeToCreate);
  return { recipe: result };
};

const getAllRecipes = async () => {
  const result = await recipesModel.getAllRecipes();
  return result;
};

const findRecipe = async (id) => {
  if (id.length !== 24) throw recipeNotFound;
  const result = await recipesModel.findRecipeById(id);
  if (!result) throw recipeNotFound;
  return result;
};

const editRecipe = async (id, user, editedRecipe) => {
  const recipeToEdit = await findRecipe(id);
  validateRecipeOwnerOrAdmin(user, recipeToEdit);
  await recipesModel.updateRecipe(id, editedRecipe);
  return { ...recipeToEdit, ...editedRecipe };
};

const deleteRecipe = async (id, user) => {
  const recipeToDelete = await findRecipe(id);
  validateRecipeOwnerOrAdmin(user, recipeToDelete);
  await recipesModel.deleteRecipe(id);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipe,
  editRecipe,
  deleteRecipe,
};
