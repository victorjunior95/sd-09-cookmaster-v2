const Joi = require('joi');
const { ObjectId } = require('mongodb');
const model = require('../models/recipes');

const recipeSchema = Joi.object({
  name: Joi.string().not().empty().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().not().empty().required(),
  userId: Joi.object().not().empty().required(),
});

const create = async (recipe) => {
  const { error } = recipeSchema.validate(recipe);
  if (error) return { err: { code: 'invalid_data', message: 'Invalid entries. Try again.' } };
  const { insertedId } = await model.create(recipe);
  return insertedId;
};

const find = async (query) => {
  const Recipes = await model.find(query);
  return Recipes;
};

const findOne = async (id) => {
  if (!ObjectId.isValid(id)) return { err: { code: 'not_found', message: 'recipe not found' } };
  const [Recipe] = await model.findOne(new ObjectId(id));
  return Recipe;
};

const updateOne = async (recipe) => {
  const { error } = recipeSchema.validate(recipe);
  if (error) return { err: { code: 'invalid_data', message: 'Invalid entries. Try again.' } };
  await model.updateOne(recipe);
};

module.exports = { create, find, findOne, updateOne };
