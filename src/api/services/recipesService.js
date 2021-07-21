const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');

const secret = 'mestrecucaisthenewcookmaster';

const recipeSchema = Joi.object().keys({
  name: Joi.string().not().empty().required(),
  ingredients: Joi.string().not().empty().required(),
  preparation: Joi.string().not().empty().required(),
});

const OK_STATUS = 200;
const CREATED_STATUS = 201;

const NOT_FOUND_RECIPE = {
  status: 404,
  err: { message: 'recipe not found' },
};

const BAD_REQUEST_INVALID_ENTRIES = {
  status: 400,
  err: { message: 'Invalid entries. Try again.' },
};

const UNAUTHORIZED_JWT_MALFORMED = {
  status: 401,
  err: { message: 'jwt malformed' },
};

const UNAUTHORIZED_MISSING_TOKEN = {
  status: 401,
  err: { message: 'missing auth token' },
};

async function validateToken(token) {
  if (!token) throw UNAUTHORIZED_MISSING_TOKEN;
  try {
    const decoded = jwt.verify(token, secret);
    const { email } = decoded.data;
    const user = await usersModel.getUserByEmail(email);
    if (!user) throw UNAUTHORIZED_JWT_MALFORMED;
    return decoded.data;
  } catch (e) {
    throw UNAUTHORIZED_JWT_MALFORMED;
  }
}

const registerRecipe = async (newRecipe, authorization) => {
  const userData = await validateToken(authorization);
  const { error } = recipeSchema.validate(newRecipe);
  if (error) throw BAD_REQUEST_INVALID_ENTRIES;
  const { _id: userId } = userData;
  const recipe = newRecipe;
  recipe.userId = userId;
  const registeredRecipe = await recipesModel.registerRecipe(recipe);
  return {
    status: CREATED_STATUS,
    registeredRecipe,
  };
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return {
    status: OK_STATUS,
    recipes,
  };
};

const validateId = (id) => (ObjectId.isValid(id));

const getRecipeById = async (id) => {
  if (!validateId(id)) throw NOT_FOUND_RECIPE;
  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) throw NOT_FOUND_RECIPE;
  return {
    status: OK_STATUS,
    recipe,
  };
};

const editRecipe = async (authorization, id, edit) => {
  await validateToken(authorization);
  const editedRecipe = await recipesModel.editRecipe(id, edit);
  return {
    status: OK_STATUS,
    editedRecipe,
  };
};
// todas as funções que dependerem de acesso ao bd precisam ser assíncronas

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
};
