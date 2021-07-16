const RecipeModel = require('../model/recipeModel');
const Errors = require('../errors');

const create = async ({ _id: userId }, name, ingredients, preparation) => {
  const created = await RecipeModel.create(userId, name, ingredients, preparation);
  return created;
};

const findAll = async () => {
  const recipesList = await RecipeModel.findAll();
  return recipesList;
};

const findById = async (id) => {
  const recipe = await RecipeModel.findById(id);
  if (!recipe) throw new Errors.RecipeNotFoundError();
  return recipe;
};

module.exports = {
  create,
  findAll,
  findById,
};