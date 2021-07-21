const Joi = require('@hapi/joi');
const Recipes = require('../Models/recipesModel');

const schemaRecipeCreate = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const validateRecipeData = (code, message) => ({ code, message });

const recipeCreate = async (name, ingredients, preparation, userId) => {
  const { error } = schemaRecipeCreate.validate({ name, ingredients, preparation });
  if (error) {
    throw validateRecipeData(400, 'Invalid entries. Try again.');
  }
  const recipe = await Recipes.recipeCreate(name, ingredients, preparation, userId);
  return { recipe };
};

const getAll = async () => {
  const recipes = await Recipes.getAll();
  return recipes;
};

const getOne = async (id) => {
  const recipe = await Recipes.getOne(id);

  if (!recipe) {
    throw validateRecipeData(404, 'recipe not found');
  }

  return recipe;
};

const recipeUpdate = async (id, name, ingredients, preparation) => {
  const recipe = await Recipes.recipeUpdate(id, name, ingredients, preparation);
  return recipe;
};

const recipeDelete = async (id) => {
  await Recipes.recipeDelete(id);
};

module.exports = {
  recipeCreate,
  getAll,
  getOne,
  recipeUpdate,
  recipeDelete,
};