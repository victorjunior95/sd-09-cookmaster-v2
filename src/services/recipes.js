const Joi = require('joi');

const Recipes = require('../models/recipes');

const JoiSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const validateError = (statusCode, message) => ({
  statusCode,
  message,
});

const create = async (recipesData, userId) => {
  const { error } = JoiSchema.validate(recipesData);

  if (error) {
    throw validateError(400, 'Invalid entries. Try again.');
  }

  const createUser = await Recipes.create({
    ...recipesData,
    userId,
  });

  return createUser;
};

const list = async () => {
  const listRecipe = await Recipes.list();

  return listRecipe;
};

module.exports = {
  create,
  list,
};
