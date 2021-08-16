const Joi = require('joi');

const recipesModel = require('../models/Recipes');

const BAD_REQUEST = {
  message: 'Invalid entries. Try again.',
  status: 400,
};

const schema = Joi.object({
  nameOfRecipe: Joi.string().required(),
  ingredientsOfRecipe: Joi.string().required(),
  preparationOfRecipe: Joi.string().required(),
});

const register = async ({ name, ingredients, preparation, userId }) => {
  const validations = schema.validate({
    nameOfRecipe: name,
    ingredientsOfRecipe: ingredients,
    preparationOfRecipe: preparation,
  });

  if (validations.error) {
    throw new Error(JSON.stringify(BAD_REQUEST));
  }

  return recipesModel.register({ name, ingredients, preparation, userId });
};

module.exports = {
  register,
};
