const recipes = require('../models/recipesModel');
const validate = require('../utils/validateRecipe');
const { verifyToken } = require('../utils/validateToken');

const create = async (recipe, token) => {
  validate.fields(recipe);
  const userId = verifyToken(token);
  const result = await recipes.create(recipe, userId);
  return result;
};

const findAll = async () => {
  const result = await recipes.findAll();
  return result;
};

const findById = async (id) => {
  const result = await recipes.findById(id);
  validate.recipeExists(result);
  return result;
};

const update = async (recipe, token, id) => {
  validate.fields(recipe);
  verifyToken(token);
  const result = await recipes.update(recipe, id);
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
};
