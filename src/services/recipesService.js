const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');
const { errorsUsers: errorMessage } = require('../helpers/errorMessagens');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;

const generateMessageError = (status, message) => ({ status, message });

const addRecipe = async (recipe) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) {
    throw generateMessageError(BAD_REQUEST, errorMessage.invalidEntries);
  }

  const response = await recipesModel.addRecipe(recipe);
  return response;
};

const getAllRecipes = async () => {
  const response = await recipesModel.getAllRecipes();
  return response;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw generateMessageError(NOT_FOUND, 'recipe not found');

  const response = await recipesModel.getById(id);

  if (!response) throw generateMessageError(NOT_FOUND, 'recipe not found');
  return response;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getById,
};