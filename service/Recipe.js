const Recipe = require('../model/Recipe');

const create = async (name, ingredients, preparation, user) => {
  const { _id } = user;
  const userId = _id;
  const newRecipe = await Recipe.create(name, ingredients, preparation, userId);
  return { recipe: newRecipe };
};

const getAll = async () => Recipe.getAll();

const findById = async (id) => Recipe.findById(id);

module.exports = { create, getAll, findById };