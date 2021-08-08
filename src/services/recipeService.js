const { recipe } = require('../models');

const addRecipe = (recipeData, userData) => {
  const newRecipe = {
    name: recipeData.name,
    ingredients: recipeData.ingredients,
    preparation: recipeData.preparation,
    userId: userData.userId,
  };

  return recipe.addRecipe(newRecipe);
};

module.exports = {
  addRecipe,
};
