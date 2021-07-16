const recipesModel = require('../models/recipesModel');

const add = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.add(
    name,
    ingredients,
    preparation,
    userId,
  );

  return { recipe };
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();

  return recipes;
};

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);

  if (!recipe) return null;

  return recipe;
};

module.exports = {
  add,
  getAll,
  getById,
};
