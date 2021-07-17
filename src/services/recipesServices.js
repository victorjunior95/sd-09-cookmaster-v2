const recipesModels = require('../models/recipesModels');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipesModels.createRecipes(name, ingredients, preparation, userId);
  return { recipe: newRecipe };
};

module.exports = {
  createRecipes,
};
