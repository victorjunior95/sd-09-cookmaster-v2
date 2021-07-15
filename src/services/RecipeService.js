const RecipeModel = require('../models/RecipeModel');
const error = require('../helpers/errors');

const create = async (recipeInfo, user) => {
  const { name, ingredients, preparation } = recipeInfo;
  if (!name || !ingredients || !preparation) return error.INVALID_ENTRIES;

  const createdRecipe = await RecipeModel.create(recipeInfo, user);
  return createdRecipe;
};

const getAll = async () => {
  const recipesList = await RecipeModel.getAll();
  return recipesList;
};

module.exports = {
  create,
  getAll,
};
