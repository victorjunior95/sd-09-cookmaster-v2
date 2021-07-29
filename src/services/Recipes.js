const Joi = require('joi');
const model = require('../models/Recipes');

const validateRecipe = (name, preparation, ingredients) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    preparation: Joi.string().required(),
    ingredients: Joi.string().allow('').required(),
  }).validate({ name, ingredients, preparation });

  if (error) {
    error.statusCode = 'badRequest';
    throw error;
  }
};

const createRecipe = async (name, preparation, ingredients, userId) => {
  validateRecipe(name, preparation, ingredients);
  const result = await model.createRecipe(name, preparation, ingredients, userId);
  return result;
};

module.exports = {
  createRecipe,
};
