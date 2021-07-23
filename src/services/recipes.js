const Joi = require('joi');
const recipeModel = require('../model/recipes');

const commonError = 'Invalid entries. Try again.';
const RecipesShema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': commonError,
    'any.required': commonError,
  }),
  ingredients: Joi.string().required().messages({
    'string.base': commonError,
    'any.required': commonError,
  }),
  preparation: Joi.string().required().messages({
    'string.base': commonError,
    'any.required': commonError,
  }),
});

const validateError = (status, message) => ({ status, message });

const createRecipe = async (recipe, userId) => {
  const { error } = RecipesShema.validate(recipe);

  if (error) {
    throw validateError(400, error.message);
  }

  const newRecipe = await recipeModel.createRecipe(recipe, userId);
  return newRecipe;
};

const listRecipes = async () => {
  const list = await recipeModel.listAllRecipes();
  return list;
};

const findById = async (id) => {
  const recipe = await recipeModel.findById(id);
  return recipe;
};

const updateRecipes = async (id, recipes, user) => {
  const { error } = RecipesShema.validate(recipes);

  if (error) {
    throw validateError(401, error.message);
  }
  const infoRecipe = await recipeModel.findById(id);

  const { role, _id: userId } = user;

  if (role !== 'admin' && infoRecipe.userId !== userId) {
    const err = new Error('Incorrect username or password');
      err.status = 401;
  }

  await recipeModel.updateRecipe(id, recipes);
  const { name, ingredients, preparation } = recipes;
  const recipeUpdate = { _id: id, name, ingredients, preparation, userId };

  return recipeUpdate;
};

const updateImage = async (url, id, user) => {
  const infoRecipe = await recipeModel.findById(id);

  const { role, _id: userId } = user;

  if (role !== 'admin' && infoRecipe.userId !== userId) {
    const err = new Error('Incorrect username or password');
      err.status = 401;
  }

  await recipeModel.updateRecipe(id, infoRecipe, userId, url);
  const { name, ingredients, preparation } = infoRecipe;

  const recipeUpdate = { _id: id, name, ingredients, preparation, userId, image: url };

  return recipeUpdate;
};

const deleteRecipe = async (id) => {
  const recipe = await recipeModel.deleteRecipe(id);
  return recipe;
};

module.exports = {
  createRecipe,
  listRecipes,
  findById,
  updateRecipes,
  deleteRecipe,
  updateImage,
};