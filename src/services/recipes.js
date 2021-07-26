const recipes = require('../models/recipes');
const valid = require('../validation/recipes');
const { verifyToken } = require('../validation/token');

const create = async (recipe, token) => {
  valid.fields(recipe);
  const { userId } = verifyToken(token);
  const result = await recipes.create(recipe, userId);
  return result;
};

const find = async () => {
  const result = await recipes.find();
  return result;
};

const findById = async (id) => {
  const result = await recipes.findById(id);
  valid.invalidRecipe(result);
  return result;
};

const update = async (recipe, token, id) => {
  valid.fields(recipe);
  verifyToken(token);
  const result = await recipes.update(recipe, id);
  return result;
};

const exclude = async (token, id) => {
  const { userId } = verifyToken(token);
  const result = await recipes.exclude(id, userId);
  return result;
};

module.exports = {
  create,
  find,
  findById,
  update,
  exclude,
};