// recipesService
const { ObjectID } = require('mongodb');
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

async function recipesGetAll() {
  try {
    const data = await RecipesModel.findAllRecipes();
    if (!data) throw statusError.type9;
    return data;
  } catch (error) {
    return error;
  }
}

async function recipesGetOne(recipeId) {
  try {
    const idParsed = ObjectID(recipeId);
    const data = await RecipesModel.findOneRecipe({ _id: idParsed });
    if (!data) throw statusError.type7;
    return data;
  } catch (error) {
    return statusError.type7;
  }
}

module.exports = {
  recipeVerifier,
  recipeAdd,
  recipesGetAll,
  recipesGetOne,
};
