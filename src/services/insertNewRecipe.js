const Joi = require('joi');
const { INVALID_RECIPE_DATA } = require('../Messages/errors');
const { insertRecipe } = require('../models');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const validateNewRecipe = (recipe) => {
  const { error } = recipeSchema.validate(recipe);
  if (error) return INVALID_RECIPE_DATA;
  return true;
};

const insertNewRecipe = async (newRecipe) => {
  const verify = {
    name: newRecipe.name,
    ingredients: newRecipe.ingredients,
    preparation: newRecipe.preparation,
  };

  const result = validateNewRecipe(verify);
  if (result !== true) return result;
  const recipe = await insertRecipe(newRecipe);

  return { code: 201, message: recipe };
};

module.exports = insertNewRecipe;
