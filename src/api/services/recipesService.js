const Joi = require('joi');
const jwt = require('jsonwebtoken');

const recipeModel = require('../models/recipeModel');

const secret = 'secret';
const minString = 1;

const schema = Joi.object({
  name: Joi.string()
    .min(minString)
    .required(),
  ingredients: Joi.string()
    .min(minString)
    .required(),
  preparation: Joi.string()
    .required(),
});

const authToken = async (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    console.error(err);
    return 'err';
  }
};

const recipeValidation = async (body) => {
  try {
    await schema.validate(body);
    return 'done';
  } catch (err) {
    console.error(err);
    return err;
  }
};

const underlineId = '_id';

const createRecipe = async (body, user) => {
  const recipeToCreate = {
    recipe: {
      name: body.name,
      ingredients: body.ingredients,
      preparation: body.preparation,
      userId: user[underlineId],
    },
  };
  
  const createdRecipe = await recipeModel.createRecipe(recipeToCreate);
  return { recipe: createdRecipe };
};

module.exports = {
  authToken,
  recipeValidation,
  createRecipe,
};
