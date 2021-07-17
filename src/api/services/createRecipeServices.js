const Joi = require('joi');
const models = require('../models');
const { verifyToken } = require('../jwt');

const validateRecipe = (recipeData) =>
  Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(recipeData);

module.exports = async (token, recipeData) => {
  const payload = await verifyToken(token);
  const { _id } = payload;
  const { error } = validateRecipe(recipeData);

  if (error) throw (Error('Invalid entries. Try again.'));

  const result = await models.createRecipe(recipeData);

  return { recipe: { ...result, userId: _id } };
};
