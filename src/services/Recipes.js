const Joi = require('joi');
const { ObjectId } = require('mongodb');

const recipesModel = require('../models/Recipes');

const BAD_REQUEST = {
  message: 'Invalid entries. Try again.',
  status: 400,
};
const NOT_FOUND = {
  message: 'recipe not found',
  status: 404,
};

const schema = Joi.object({
  nameOfRecipe: Joi.string().required(),
  ingredientsOfRecipe: Joi.string().required(),
  preparationOfRecipe: Joi.string().required(),
});

const register = async ({ name, ingredients, preparation, userId }) => {
  const validations = schema.validate({
    nameOfRecipe: name,
    ingredientsOfRecipe: ingredients,
    preparationOfRecipe: preparation,
  });

  if (validations.error) {
    throw new Error(JSON.stringify(BAD_REQUEST));
  }

  return recipesModel.register({ name, ingredients, preparation, userId });
};

const getAll = async () => recipesModel.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify(NOT_FOUND));
  }

  const result = await recipesModel.getById(id);

  if (!result) {
    throw new Error(JSON.stringify(NOT_FOUND));
  }

  return result;
};

const update = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify(NOT_FOUND));
  }

  return recipesModel.update(id, name, ingredients, preparation);
};

const erase = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify(NOT_FOUND));
  }

  return recipesModel.erase(id);
};

const newURL = async (id, image) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(JSON.stringify(NOT_FOUND));
  }

  return recipesModel.newURL(id, image);
};

module.exports = {
  register,
  getAll,
  getById,
  update,
  erase,
  newURL,
};
