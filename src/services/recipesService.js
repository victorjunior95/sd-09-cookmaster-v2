const recipesModel = require('../models/recipesModel');
const { validateError, schema } = require('./schemas/recipesSchema');

const createRecipe = async (recipe) => {
  const { userId: _, ...recipeData } = recipe;

  const { error } = schema.validate(recipeData);

  if (error) throw validateError(400, error.message);

  const result = await recipesModel.createRecipe(recipe);

  return { result, status: 201 };
};

const findAll = async () => {
  const result = await recipesModel.getAll();

  return { result, status: 200 };
};

module.exports = { createRecipe, findAll };
