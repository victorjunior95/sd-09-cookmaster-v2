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

const getAllRecipes = async () => recipesModel.getAllRecipesFromDb();

module.exports = {
  validateNewRecipe,
  getAllRecipes,
};
