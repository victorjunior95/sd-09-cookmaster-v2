const Joi = require('joi');
const jwt = require('jsonwebtoken');
const RecipeModel = require('../models/RecipeModel');

const JWT_SECRET = 'cookmaster';

const validateRecipeData = (data) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    ingredients: Joi.string().not().empty().required(),
    preparation: Joi.string().not().empty().required(),
  }).validate(data);
  if (error) {
    throw new Error('invalid_data');
  }
};

const validateToken = (token) => {
  const { id } = jwt.verify(token, JWT_SECRET);
  return id;
};

const create = (data, token) => {
  validateRecipeData(data);
  const userId = validateToken(token);
  return RecipeModel.create(data, userId);
};

const getAll = () => RecipeModel.getAll();

module.exports = {
  create,
  getAll,
};
