const recipesModel = require('../models/recipesModel');

const postNewRecipe = async ({ name, ingredients, preparation }) => {
  const data = await recipesModel.postNewRecipe({ name, ingredients, preparation });
  return data;
};

const getAllRecipes = async () => {
  const data = await recipesModel.getAllRecipes();
  return data;
};

module.exports = { postNewRecipe, getAllRecipes };