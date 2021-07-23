const jwt = require('jsonwebtoken');
const recipesModel = require('../models/recipesModel');

const privateKey = 'myprecious';

const INVALID_ENTRIES = {
  status: 400,
  error: {
    message: 'Invalid entries. Try again.',
  },
};

const INVALID_TOKEN = {
  status: 401,
  error: {
    message: 'jwt malformed',
  },
};

const RECIPE_NOT_FOUND = {
  status: 404,
  error: {
    message: 'recipe not found',
  },
};

const MISSING_AUTH = {
  status: 401,
  error: {
    message: 'missing auth token',
  },
};

function validateName(name) {
  if (!name) throw INVALID_ENTRIES;
}

function validateIngredients(ingredients) {
  if (!ingredients) throw INVALID_ENTRIES;
}

function validatePreparation(preparation) {
  if (!preparation) throw INVALID_ENTRIES;
}

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
  } catch (err) {
    throw INVALID_TOKEN;
  }
}

function validateRecipe(recipe) {
  if (!recipe) throw RECIPE_NOT_FOUND;
}

function validateAuthentication(token) {
  console.log('token', token);
  if (!token) throw MISSING_AUTH;
}

module.exports = {
  validateName,
  validateIngredients,
  validatePreparation,
  validateToken,
  validateRecipe,
  validateAuthentication,
};
