const recipesModel = require('../model/recipes');

const registerRecipe = async (name, ingredients, preparation, userId) => {
  const response = await recipesModel.registerRecipe({ name, ingredients, preparation, userId });
  if (!response) return { status: 400, payload: { message: 'Error' } };
  return { status: 201, payload: { recipe: response } };
};

const getRecipes = async () => {
  console.log('Service');
  const response = await recipesModel.getRecipes();
  return { status: 200, payload: response };
};

module.exports = { registerRecipe, getRecipes };
