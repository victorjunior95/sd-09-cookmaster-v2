const recipesModels = require('../../models/recipes');

const insertRecipe = async (newRecipe) => {
  const insertedRecipe = await recipesModels.insertRecipe(newRecipe);
  return insertedRecipe;
};

const getAllRecipes = async () => {
  const allRecipes = await recipesModels.getAllRecipes();
  return allRecipes;
};

module.exports = {
  insertRecipe,
  getAllRecipes,
};
