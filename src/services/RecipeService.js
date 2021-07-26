const Joi = require('joi');
const { ObjectId } = require('mongodb');
const RecipeModel = require('../models/RecipeModel');

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

const validateId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('not_found');
  }
};

const create = (data, userId) => {
  validateRecipeData(data);
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

const edit = async (id, data) => {
  validateRecipeData(data);
  validateId(id);
  let resp = await RecipeModel.edit(new ObjectId(id), data);
  if (!resp) {
    throw new Error('not_found');
  }
  resp = await RecipeModel.getById(new ObjectId(id));
  return resp;
};

const deleteRecipe = async (id) => {
  validateId(id);
  const resp = await RecipeModel.deleteRecipe(new ObjectId(id));
  if (!resp) {
    throw new Error('not_found');
  }
};

const insertImg = async (id) => {
  validateId(id);
  const imageUrl = { image: `localhost:3000/src/uploads/${id}.jpeg` };
  let resp = await RecipeModel.edit(new ObjectId(id), imageUrl);
  if (!resp) {
    throw new Error('not_found');
  }
  resp = await RecipeModel.getById(new ObjectId(id));
  return resp;
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
  deleteRecipe,
  insertImg,
};
