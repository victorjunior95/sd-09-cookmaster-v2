const RecipesModel = require('../models/RecipesModel');

const verifyRecipe = (name, ingredients, preparation) => {
  const errObj = {
    status: 400,
    message: 'Invalid entries. Try again.',
  };
  if (!name || !ingredients || !preparation) throw errObj;
};

const verifyGetOneRecipe = (recipe) => {
  const errObj = {
    status: 404,
    message: 'recipe not found',
  };  
  if (!recipe) throw errObj;
};

const createRecipe = async (name, ingredients, preparation, id) => {
  verifyRecipe(name, ingredients, preparation);
  const newRecipe = await RecipesModel.createRecipe(name, ingredients, preparation, id);
  return newRecipe;
};

const getAllRecipes = async () => {
  const allRecipes = await RecipesModel.getAllRecipes();
  return allRecipes;
};

const getOneRecipe = async (id) => {
  const oneRecipe = await RecipesModel.getOneRecipe(id);
  verifyGetOneRecipe(oneRecipe);
  return oneRecipe;
};

const editRecipe = async (name, ingredients, preparation, id) => {
const newRecipe = await RecipesModel.editRecipe(name, ingredients, preparation, id);
return newRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getOneRecipe,
  editRecipe,
};