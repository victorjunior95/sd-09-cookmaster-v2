const modelRecipes = require('../models/recipes');

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await modelRecipes.create(name, ingredients, preparation, userId);
  return recipe;
};

const getAll = async () => { 
  const recipe = await modelRecipes.getAll();
  return recipe;
};

// getAll().then((r) => console.log(r));
module.exports = {
  create,
  getAll,
};
