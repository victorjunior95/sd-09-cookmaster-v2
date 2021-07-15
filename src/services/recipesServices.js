const recipesModels = require('../models/recipesModels');

const postNewRecipe = async (recipeInfo) => {
  const result = await recipesModels.postNewRecipe(recipeInfo);

  return result;
};

module.exports = {
  postNewRecipe,
};
