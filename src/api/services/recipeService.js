const Joi = require('joi');
const { ObjectId } = require('mongodb');

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
} = require('../models/recipeModel');

const recipesSchema = Joi.object({
  name: Joi.string().required(),
  preparation: Joi.string().required(),
  ingredients: Joi.string().required(),
});

const validateError = (status, message) => ({ status, message });

const createRecipeService = async ({ name, preparation, ingredients, userId }) => {
  const { error } = recipesSchema.validate({ name, ingredients, preparation });

  if (error) {
   throw validateError(400, 'Invalid entries. Try again.');
  }

  const idObject = await createRecipe({ name, preparation, ingredients, userId });

  return idObject;
};

const getAllRecipesService = async () => {
  const recipes = await getAllRecipes();

  return recipes;
};

const getRecipeByIdService = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw validateError(404, 'recipe not found');
  }

  const product = await getRecipeById(id);

  if (!product) {
    throw validateError(404, 'recipe not found');
  }

  return product;
};

const updateRecipeByIdService = async (id, name, ingredients, preparation) => {
  const result = await updateRecipeById(id, name, ingredients, preparation);

  return result;
};

module.exports = {
  createRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeByIdService,
};