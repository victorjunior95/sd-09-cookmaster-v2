const RecipesModel = require('../models/Recipes');
const RecipeSchemas = require('../schemas/Recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const isValid = RecipeSchemas.recipeValidator(name, ingredients, preparation);
  if (isValid.result) return isValid;

  const created = await RecipesModel.createRecipe(name, ingredients, preparation, userId);
  return created;
};

const getAllRecipes = async () => RecipesModel.getAllRecipes();

const getRecipeById = async (id) => {
  const isValid = await RecipeSchemas.idValidator(id);
  return isValid;
};

const editRecipe = async (userID, recipe) => RecipesModel.editRecipe(userID, recipe);

const deleteRecipe = async (recipeId, userID, role) => {
  const deleted = await RecipesModel.deleteRecipe(recipeId, userID, role);
  return deleted;
};

const insertRecipe = async (id, userId, path, role) => RecipesModel.insertImage(
  id,
  userId,
  `localhost:3000/${path}`,
  role,
);

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  insertRecipe,
};