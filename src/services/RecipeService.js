const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
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

const validateId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('not_found');
  }
};

const create = (data, token) => {
  validateRecipeData(data);
  const userId = validateToken(token);
  return RecipeModel.create(data, userId);
};

const getAll = () => RecipeModel.getAll();

const getById = async (id) => {
  validateId(id);
  const resp = await RecipeModel.getById(new ObjectId(id));
  if (!resp) {
    throw new Error('not_found');
  }
  return resp;
};

const edit = async (id, data, token) => {
  validateRecipeData(data);
  validateId(id);
  if (!token) {
    throw new Error('missing_token');
  }
  const userId = validateToken(token);
  const resp = await RecipeModel.edit(new ObjectId(id), data, userId);
  if (!resp) {
    throw new Error('not_found');
  }
  return resp;
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
};
