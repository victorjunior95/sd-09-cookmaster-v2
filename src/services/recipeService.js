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

const getRecipes = () => recipe.getRecipes();

const getRecipeById = (id) => recipe.getRecipeById(id);

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
};
