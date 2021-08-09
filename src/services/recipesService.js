const Joi = require('joi');
const recipesModel = require('../models/recipesModel');

const BAD_REQUEST_STATUS = 400;
const CREATED_STATUS = 201;

const msg400 = 'Invalid entries. Try again.';

const schemaRecipes = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const register = async (recipe, userId) => {
  const validateRecipe = schemaRecipes.validate(recipe);

  if (validateRecipe.error) {
    return { status: BAD_REQUEST_STATUS, result: { message: msg400 } };
  }

  const resultRecipe = await recipesModel
    .recipesRegistration(recipe, userId);

  return {
    status: CREATED_STATUS, result: resultRecipe,
  };
};

module.exports = {
  register,
};
