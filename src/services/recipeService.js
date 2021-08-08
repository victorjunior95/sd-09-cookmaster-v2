const { recipe } = require('../models');

const HTTP_UNAUTHORIZED_STATUS = 401;

const NOT_YOUR_RECIPE_ERROR = 'You can modify only your own recipes';

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

const updateRecipe = async (newRecipeData, userData, id) => {
  const foundRecipe = await getRecipeById(id);

  if (foundRecipe.userId.toString() !== userData.userId && userData.role !== 'admin') {
    const err = new Error(NOT_YOUR_RECIPE_ERROR);

    err.statusCode = HTTP_UNAUTHORIZED_STATUS;

    return err;
  }

  const newRecipe = { ...foundRecipe, ...newRecipeData };

  await recipe.updateRecipe(newRecipeData, id);

  return newRecipe;
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
};
