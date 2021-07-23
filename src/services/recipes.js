const modelRecipes = require('../models/recipes');

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await modelRecipes.create(name, ingredients, preparation, userId);
  return recipe;
};

module.exports = {
  create,
};
