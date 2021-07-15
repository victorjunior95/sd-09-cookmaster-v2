const recipesModel = require('../models/recipes');

const createRecipes = async (name, ingredients, preparation, id) => {
  const recipe = await recipesModel.createRecipes(name, ingredients, preparation, id);

  return { recipe };
};

const getAll = async () => {
  const allRecipes = await recipesModel.getAll();

  return allRecipes;
};

module.exports = {
  createRecipes,
  getAll,
};
