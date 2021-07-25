const Joi = require('@hapi/joi');
const Recipes = require('../models/modelRecipes');

dataErr = require('../helpers/index')

const newRecipeSCHM = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const validateRecipeData = (code, message) => ({ code, message });

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { error } = newRecipeSCHM.validate({ name, ingredients, preparation });
  if (error) {
    throw dataErr(400, 'Invalid entries. Try again.');
  }
  const newRecipe = await Recipes.createRecipe(name, ingredients, preparation, userId);
  return { newRecipe };
};

module.exports = {
  createRecipe,
};
