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

const updateRecipe = async (id, user) => {
  const { matchedCount } = await recipesModel.update(id, user);
  return matchedCount;
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
