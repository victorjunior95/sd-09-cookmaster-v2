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

module.exports = {
  recipeCreate,
};