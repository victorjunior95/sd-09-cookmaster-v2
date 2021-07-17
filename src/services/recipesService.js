const Joi = require('joi');
const recipesModel = require('../models/recipesModel');

const validateRecipe = Joi.object({
  name: Joi.string().required(),
  preparation: Joi.string().required(),
  ingredients: Joi.string().required(),
});

const create = async ({ name, preparation, ingredients, userId }) => {
    const { error } = validateRecipe.validate({ name, ingredients, preparation });
    if (error) return { error: 'Invalid entries. Try again.', status: 400 };
  
    const idObject = await recipesModel.create({ name, preparation, ingredients, userId });
    return idObject;
  };

  module.exports = {
    create,
  }; 