const Joi = require('joi');
const { ObjectId } = require('mongodb');

const Model = require('../models/RecipesModel');
const { INVALID_DATA, NOT_FOUND } = require('../middleware/httpStatus');
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

const findRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      error: {
        status: NOT_FOUND, message: 'recipe not found',
      },
    };
  }

  const recipe = await Model.findRecipe(id);
  return recipe;
};

const updateOne = async (id, newRecipe, userId) => {
  const { error } = recipeValidate.validate({ ...newRecipe });
  if (error) {
    return {
      error: {
        status: INVALID_DATA, message: 'recipe not found',
      },
    };
  }

  await Model.updateOne(id, newRecipe);
  const updatedRecipe = {
    _id: id,
    ...newRecipe,
    userId,
  };

  return updatedRecipe;
};

module.exports = {
  createRecipe,
  findAll,
  findRecipe,
  updateOne,
};