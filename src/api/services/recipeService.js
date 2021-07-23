const Joi = require('joi');
const {
  createRecipe,
  getAllRecipes,
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

module.exports = {
  createRecipeService,
  getAllRecipesService,
};