const jwt = require('jsonwebtoken');
const recipeModel = require('../models/recipeModel');

const SECRET = 'xinforinfola'; // SECRETE aqui apenas para fins didaticos

const registerNewRecipe = async (name, ingredients, preparation, token) => {
  const { id } = jwt.verify(token, SECRET);
  const newRecipe = await recipeModel.registerRecipe(name, ingredients, preparation, id);
  return newRecipe;
};

const getRecipes = async () => {
  const result = await recipeModel.getAllRecipes();
  return result;
};

const getById = async (id) => {
  const result = await recipeModel.getRecipeById(id);
  if (!result) {
    const ObjectError = {
      code: 404,
      message: 'recipe not found',
    };
    throw ObjectError;
  }
  return result;
};

const update = async (id, name, ingredients, preparation) => {
  const result = await recipeModel.updateRecipe(id, name, ingredients, preparation);
  return result;
};

const deleteRes = async (id) => {
  const result = await recipeModel.deleteRecipe(id);
  return result;
};

const addImage = async (id, path) => {
  const result = await recipeModel.addImageToRecipe(id, path);
  return result;
};

module.exports = {
  registerNewRecipe,
  getRecipes,
  getById,
  update,
  deleteRes,
  addImage,
};
