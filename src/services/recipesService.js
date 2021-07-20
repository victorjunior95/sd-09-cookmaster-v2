const Joi = require('joi');
const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const recipeNotFound = 'recipe not found';

const validateRecipe = Joi.object({
  name: Joi.string().required(),
  preparation: Joi.string().required(),
  ingredients: Joi.string().required(),
});

const create = async ({ name, preparation, ingredients, userId }) => {
  const { error } = validateRecipe.validate({ name, ingredients, preparation });
  if (error) return { error: 'Invalid entries. Try again.', status: 400 };

  const idObject = await recipesModel.create({ name, preparation, ingredients, userId });
  return idObject;
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return { error: recipeNotFound, status: 404 };
  const recipe = await recipesModel.getById(id);
  if (!recipe) return { error: recipeNotFound, status: 404 };
  return recipe;
};

const update = async (name, ingredients, preparation, recipeId) => {
  const recipe = await recipesModel.update(name, ingredients, preparation, recipeId);

  return recipe;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return { error: recipeNotFound, status: 404 };
  const recipe = await recipesModel.getById(id);

  if (!recipe) return { error: recipeNotFound, status: 404 };

  return recipesModel.deleteRecipe(id);
};

const uploadImage = async (id, image) => {
  if (!ObjectId.isValid(id)) return { error: recipeNotFound, status: 404 };

  const recipe = await recipesModel.getById(id);
  if (!recipe) return { error: recipeNotFound, status: 404 };
  
  return recipesModel.uploadImage(id, image);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteRecipe,
  uploadImage,
};