const Joi = require('joi');
const { validateToken } = require('../middlewares/tokenValidation');
const { newRecipeModel } = require('../models/recipeModels');

const dataValidation = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const retrieveTokenData = async (token) => {
  const decoded = await validateToken(token);
  return decoded;
};

const validateRecipeData = async (recipeData, token) => {
  const { error } = dataValidation.validate(recipeData);
  if (error) return { error: 'Invalid entries. Try again.', status: 400 };

  const validToken = await retrieveTokenData(token);
  if (validToken.error) return validToken;

  return validToken;
};  

const newRecipeService = async (recipeData, token) => {
  const validRecipe = await validateRecipeData(recipeData, token);
  if (validRecipe.error) return validRecipe;

  const { _id } = validRecipe;
  const recipe = { ...recipeData, userId: _id };
  const createRecipe = await newRecipeModel(recipe);

  return { recipe: createRecipe };
};

module.exports = {
  newRecipeService,
};