const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const validateNewRecipe = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return {
      message: 'Invalid entries. Try again.',
      statusCode: 400,
    };
  }

  return recipesModel.postIntoDb(name, ingredients, preparation);
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      message: 'recipe not found',
      statusCode: 404,
    };
  }

  const recipe = await recipesModel.getRecipeByIdFromDb(id);

  return recipe;
};

const getAllRecipes = async () => recipesModel.getAllRecipesFromDb();

module.exports = {
  validateNewRecipe,
  getAllRecipes,
  getRecipeById,
};
