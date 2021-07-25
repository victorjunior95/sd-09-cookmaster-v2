const recipesModels = require('../../models/recipes');

const insertRecipe = async (newRecipe) => {
  const insertedRecipe = await recipesModels.insertRecipe(newRecipe);
  return insertedRecipe;
};

module.exports = {
  insertRecipe,
};
