const recipesModel = require('../models/recipesModel');
const { validateError, schema } = require('./schemas/recipesSchema');

const createRecipe = async (recipe) => {
  const { error } = schema.validate(recipe);

  if (error) throw validateError(400, error.message);

  const result = await recipesModel.createRecipe(recipe);

  return { result, status: 201 };
};

module.exports = { createRecipe };
