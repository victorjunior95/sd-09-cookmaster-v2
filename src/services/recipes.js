const recipesModel = require('../models/recipes');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.createRecipes(name, ingredients, preparation, userId);

  return { recipe };
};

const getAll = async () => {
  const allRecipes = await recipesModel.getAll();

  return allRecipes;
};

const getRecipe = async (id) => {
  const recipe = await recipesModel.getRecipe(id);

  if (!recipe) return ({ code: 404, message: 'recipe not found' });

  return recipe;
};

module.exports = {
  createRecipes,
  getAll,
  getRecipe,
};
