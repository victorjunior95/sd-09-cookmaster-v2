const Joi = require('joi');

const Model = require('../models/RecipesModel');
const { INVALID_DATA } = require('../middleware/httpStatus');
// EMAIL_ALREADY_EXIST, UNAUTHORIZED

const recipeValidate = Joi.object({
  name: Joi.string().not().empty().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().not().empty().required(),
});

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const { error } = recipeValidate.validate({ name, ingredients, preparation });
  if (error) {
    return { error: {
      status: INVALID_DATA, message: 'Invalid entries. Try again.',
    } };
  }
  const recipe = await Model.createRecipe({ name, ingredients, preparation, userId });
  return recipe;
};

const findAll = async () => {
  const recipes = await Model.findAll();
  return recipes;
};

module.exports = {
  createRecipe,
  findAll,
};