// const { ObjectId } = require('mongodb');
const Joi = require('joi');
const recipesModel = require('../models/recipesModel');

const recipesSchema = Joi.object({
  name: Joi.string().required(),
  preparation: Joi.string().required(),
  ingredients: Joi.string().required(),
});

const validateError = (status, message) => ({ status, message });

const create = async ({ name, preparation, ingredients, userId }) => {
  const { error } = recipesSchema.validate({ name, ingredients, preparation });
  if (error) throw validateError(400, 'Invalid entries. Try again.');

  const idObject = await recipesModel.create({ name, preparation, ingredients, userId });
  return idObject;
};

module.exports = {
  create,
};