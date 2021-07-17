const recipes = require('../models/recipesModel');

const create = async (recipe) => {
  const result = await recipes.create(recipe);
  return result;
};

module.exports = {
  create,
};
