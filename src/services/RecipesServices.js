// recipesService
const validators = require('./allValidators');
const statusError = require('./allMessages');
const RecipesModel = require('../models/RecipesModel');

function recipeVerifier(name, ingredients, preparation) {
  try {
    if (!validators.nameIsValid(name)) throw statusError.type1;
    if (!validators.nameIsValid(ingredients)) throw statusError.type1;
    if (!validators.nameIsValid(preparation)) throw statusError.type1;
    return {};
  } catch (error) {
    return error;
  }
}

async function recipeAdd(recipeObject) {
  try {
    const data = await RecipesModel.addRecipe(recipeObject);
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  recipeVerifier,
  recipeAdd,
};
