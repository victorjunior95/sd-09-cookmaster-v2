const joi = require('joi');
const RecipesModel = require('../models/recipesModel');
const response = require('../middlewares/responseCodes');

const genError = (errorCode, message) => ({
  errorCode,
  message,
});

const RECIPE_SCHEMA = joi.object({
  name: joi.string().required(),
  ingredients: joi.string().required(),
  preparation: joi.string().required(),
});

const validateRecipe = (recipeInfo) => {
    const { error } = RECIPE_SCHEMA.validate(recipeInfo);
    if (error) {
      throw genError(response.BAD_REQUEST, 'Invalid entries. Try again.');
    }
    return null;
  };

const postRecipe = async (recipeInfo, userInfo) => {
  try {
    const newRecipe = await RecipesModel.postRecipe(recipeInfo, userInfo);
    return newRecipe;
  } catch (error) {
    return error;
  }
};

const getAllRecipes = async () => RecipesModel.getAllRecipes();

module.exports = {
  postRecipe,
  validateRecipe,
  getAllRecipes,
};
