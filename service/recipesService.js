const recipesModel = require('../model/recipesModel');

const createRecipe = async (recipe) => {
  await recipesModel.registerRecipe(recipe);
};

module.exports = { createRecipe };