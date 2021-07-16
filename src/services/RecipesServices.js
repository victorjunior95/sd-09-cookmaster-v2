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

async function recipeVerifierUser(idUser, recipeId, roleUser) {
  try {
    const idParsed = ObjectID(recipeId);
    const data = await RecipesModel.findOneRecipe({ _id: idParsed });
    if (!data.userId) throw statusError.type7;
    if (idUser === data.userId || roleUser === 'admin') return data;
    throw statusError.type5;
  } catch (error) {
    return error;
  }
}

async function recipeUpdateOne(id, name, ingredients, preparation) {
  try {
    const data = await RecipesModel.updateOneRecipe(id, name, ingredients, preparation);
    if (!data) throw statusError.type1;
    return data;
  } catch (error) {
    return error;
  }
}

async function recipeDeleteOne(recipeId) {
  try {
    const idParsed = ObjectID(recipeId);
    const data = await RecipesModel.deleteOneRecipe({ _id: idParsed });
    if (data.error) throw statusError.type7;
    return data;
  } catch (error) {
    return error;
  }
}

async function recipeUpdateAddImage(recipeId, imagePath) {
  try {
    const idParsed = ObjectID(recipeId);
    const data = await RecipesModel.updateRecipeAddImage(idParsed, imagePath);
    if (!data) throw statusError.type1;
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  recipeVerifier,
  recipeAdd,
  recipesGetAll,
  recipesGetOne,
  recipeVerifierUser,
  recipeUpdateOne,
  recipeDeleteOne,
  recipeUpdateAddImage,
};
