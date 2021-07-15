const { ObjectId } = require('mongodb');
const joi = require('joi');
const {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
} = require('../models/recipesModel');

const errorInvalidEntries = { message: 'Invalid entries. Try again.' };
const errorRecipeNotFound = { message: 'recipe not found' };

// Validacoes

const verifyRecipe = (recipe) => (
  joi.object({
    name: joi.string().required(),
    ingredients: joi.string().required(),
    preparation: joi.string().required(),
    userId: joi.string().required(),
  }).validate(recipe)
);

// 

const registerRecipeService = async (recipe) => {
  const { error } = verifyRecipe(recipe);
  if (error) {
    return { code: 400, response: errorInvalidEntries };
  }
  const registeredRecipe = await registerRecipe(recipe);
  return { code: 200, response: registeredRecipe };
};

const getAllRecipesService = async () => {
  const result = await getAllRecipes();
  return { code: 200, response: result };
};

const getRecipeByIdService = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: 404, response: errorRecipeNotFound };
  }
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return { code: 404, response: errorRecipeNotFound };
  }
  return { code: 200, response: recipe };
};

const updateRecipeByIdService = async (id, newInfos, userId) => {
  const updatedRecipe = { _id: id, ...newInfos, userId };
  await updateRecipeById(id, newInfos);
  return { code: 200, response: updatedRecipe };
};

const deleteRecipeByIdService = async (id) => {
  const recipeToDelete = await getRecipeById(id);
  if (!recipeToDelete) {
    return { code: 404, response: errorRecipeNotFound };
  }
  await deleteRecipeById(id);
  return { code: 204, response: '' };
};

module.exports = {
  registerRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeByIdService,
  deleteRecipeByIdService,
};
