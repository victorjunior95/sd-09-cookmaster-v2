const recipesModel = require('../model/recipesModel');

const addRecipe = async (recipe) => {
  await recipesModel.create(recipe);
  return { recipe };
};

const getAllRecipes = async () => {
  const usersList = await recipesModel.getAll();
  return usersList;
};

const findRecipeById = async (id) => {
  const recipe = await recipesModel.findById(id);
  return recipe;
};

const isUserAuthorized = (recipeUserId, reqUserId, role) => (
  (String(recipeUserId) === String(reqUserId) || (role === 'admin'))
);

const updateRecipe = async (reqRecipe, reqRecipeId, reqUser) => {
  const { _id, role } = reqUser;
  const messageObject = { response: 401, message: 'missing auth token' };
  const currentRecipe = await findRecipeById(reqRecipeId);
  if (!isUserAuthorized(currentRecipe.userId, _id, role)) return { messageObject };
  const recipeUpToDate = { userId: _id, _id: reqRecipeId, ...reqRecipe };
  const { matchedCount } = await recipesModel.update(reqRecipeId, recipeUpToDate);
  if (matchedCount) return recipeUpToDate;
};

const removeRecipe = async (id, user) => {
  const { _id, role } = user;
  const recipe = recipesModel.findById(id);
  if (!isUserAuthorized(recipe.userId, _id, role)) {
    return { response: 401, message: 'missing auth token' };
  }
  await recipesModel.remove(id);
};

module.exports = {
  addRecipe,
  getAllRecipes,
  findRecipeById,
  updateRecipe,
  removeRecipe,
};
