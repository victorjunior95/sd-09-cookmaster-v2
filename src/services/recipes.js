const modelRecipes = require('../models/recipes');

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await modelRecipes.create(name, ingredients, preparation, userId);
  return recipe;
};

const getAll = async () => { 
  const recipe = await modelRecipes.getAll();
  return recipe;
};

const getById = async (id) => {
  const result = await modelRecipes.getById(id);
  if (!result) {
  const error = { message: 'recipe not found' };
  throw error;
  } 
  return result;
};

const updateRecipe = async (recipe) => {
  console.log(recipe);
  const result = await modelRecipes.updateRecipe(recipe);
  return result;
};

const deleteRecipe = async (id) => {
  const result = await modelRecipes.deleteRecipe(id);
  return result;
};

// getAll().then((r) => console.log(r));
module.exports = {
  create,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
};
