const Joi = require('joi');
const recipesModel = require('../models/recipesModel');

const recipesValidationSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': 'Invalid entries. Try again.' }),
  ingredients: Joi.string().required().messages({ 'any.required': 'Invalid entries. Try again.' }),
  preparation: Joi.string().required().messages({ 'any.required': 'Invalid entries. Try again.' }),
});

const validationError = (status, message) => ({ status, message });

const createRecipe = async (recipe, user) => {
  const { error } = recipesValidationSchema.validate(recipe);
  if (error) throw validationError(400, error.message);
  const recipeToCreate = { ...recipe, userId: user.id };
  const newRecipe = await recipesModel.createRecipe(recipeToCreate);
  return newRecipe;
};

module.exports = {
  createRecipe,
};
