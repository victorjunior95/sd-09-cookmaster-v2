const createErrorData = require('./createErrorData');
const createErrorToken = require('./createErrorToken');
const createErrorRecipes = require('./createErrorRecipes');
const errorResponse = require('./errorResponse');

module.exports = [
  createErrorData,
  createErrorToken,
  createErrorRecipes,
  errorResponse,
];
