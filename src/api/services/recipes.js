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

const getById = async (id) => {
  try {
    await validate.recipeId(id);
  } catch (error) {
    return error;
  }
  const { _id, name, ingredients, preparation } = await recipes.getById(id);
  return {
    status: 200,
    _id,
    name, 
    ingredients,
    preparation,
  };
};

module.exports = { create, getAll, getById };