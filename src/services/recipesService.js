// const path = require('path');

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

const updateRecipe = async (id, newDataRecipe) => {
  const { name, ingredients, preparation } = newDataRecipe;
  if (!name || !ingredients || !preparation) {
    throw generateMessageError(BAD_REQUEST, errorMessage.invalidEntries);
  }

  const response = await recipesModel.updateRecipe(id, newDataRecipe);
  return response;
};

const exclude = async (id) => {
  await recipesModel.exclude(id);
};

const addImage = async (id, nameImage) => {
  // const pathImage = (path.join(__dirname, '..', 'uploads')).split('/').splice(8, 10);
  const urlImage = `localhost:3000/src/uploads/${nameImage}`;
  const response = await recipesModel.addImage(id, urlImage);
  return response;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getById,
  updateRecipe,
  exclude,
  addImage,
};