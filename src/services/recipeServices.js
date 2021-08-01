const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { validateToken } = require('../middlewares/tokenValidation');
const {
  newRecipeModel,
  getAllRecipesModel,
  getRecipeByIdModel,
  updateRecipeByIdModel,
} = require('../models/recipeModels');

const dataValidation = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const retrieveTokenData = async (token) => {
  const decoded = await validateToken(token);
  return decoded;
};

const validateRecipeData = async (recipeData, token) => {
  const { error } = dataValidation.validate(recipeData);
  if (error) return { error: 'Invalid entries. Try again.', status: 400 };

  const validToken = await retrieveTokenData(token);
  if (validToken.error) return validToken;

  return validToken;
};  

const newRecipeService = async (recipeData, token) => {
  const validRecipe = await validateRecipeData(recipeData, token);
  if (validRecipe.error) return validRecipe;

  const { _id } = validRecipe;
  const recipe = { ...recipeData, userId: _id };
  const createRecipe = await newRecipeModel(recipe);

  return { recipe: createRecipe };
};

const getAllRecipesService = async () => {
  const allRecipes = await getAllRecipesModel();
  return allRecipes;
};

// Como validar o ID foi verificado no meu próprio código do Store Manager ObjectId.isValid(id)
const getRecipeByIdService = async (id) => {
  const validId = ObjectId.isValid(id);
  if (!validId) return { error: 'recipe not found', status: 404 };
  const recipe = await getRecipeByIdModel(id);
  if (!recipe) return { error: 'recipe not found', status: 404 };
  return recipe;
};

const updateRecipeByIdService = async (newData) => {
  const { id, token, updateData } = newData;
  
  const validToken = await retrieveTokenData(token);
  if (validToken.error) return validToken;

  const validId = ObjectId(id);
  if (!validId) return { error: 'recipe not found', status: 404 };

  const validRecipe = await validateRecipeData(updateData, token);
  if (validRecipe.error) return validRecipe;
  
  const { _id } = validRecipe;
  const recipeUpdate = { ...updateData, userId: _id, id };
 
  const updatedRecipe = await updateRecipeByIdModel(recipeUpdate);
  return updatedRecipe;
};

module.exports = {
  newRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeByIdService,
};