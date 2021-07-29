const recipes = require('../models/recipes');
const validate = require('../utils/validators');

const create = async (recipeInfo, user) => {
  try {
    await validate.recipe(recipeInfo);
  } catch (error) {
    return error;
  }
  const { _id: userId } = user;
  const response = await recipes.create(recipeInfo, userId);
  return {
    status: 201,
    recipe: response,
  };
};

const getAll = async () => {
  const response = await recipes.getAll();
  return {
    status: 200,
    recipesList: response,
  };
};

module.exports = { create, getAll };