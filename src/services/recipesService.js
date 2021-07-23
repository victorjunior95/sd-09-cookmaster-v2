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
  try {
    const currentRecipe = await findRecipeById(reqRecipeId);
    if (!isUserAuthorized(currentRecipe.userId, _id, role)) {
      return { response: 401, message: 'missing auth token' };
    }
    const recipeUpToDate = { userId: _id, _id: reqRecipeId, ...reqRecipe };
    const { matchedCount } = await recipesModel.update(reqRecipeId, recipeUpToDate);
    if (matchedCount) {
      return recipeUpToDate;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const removeRecipes = async (id) => {
  const recipe = recipesModel.findById(id);
  await recipesModel.remove(id);
  return recipe;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  findRecipeById,
  updateRecipe,
  removeRecipes,
};
