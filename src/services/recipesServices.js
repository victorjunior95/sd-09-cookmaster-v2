const Joi = require('joi');
const { ObjectId } = require('mongodb');
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

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  console.log(recipes, 'receitas');
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw validateError(404, 'recipe not found');
  const recipe = await recipesModel.getById(id);
  if (!recipe) throw validateError(404, 'recipe not found');
  return recipe;
};

const updateById = async (id, name, ingredients, preparation) => {
  const recipe = await recipesModel.updateById(id, name, ingredients, preparation);
  return recipe;
};

const deleteById = async (id, userId) => {
  if (!ObjectId.isValid(id)) throw validateError(404, 'recipe not found');
  const recipe = await recipesModel.getById(id);
  if (!recipe) throw validateError(404, 'recipe not found');
  if (recipe.userId === userId) await recipesModel.deleteById(id);
  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};