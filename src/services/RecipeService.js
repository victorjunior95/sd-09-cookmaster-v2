const RecipeModel = require('../models/RecipesModel');
const UsersModel = require('../models/UsersModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await RecipeModel.createRecipe(name, ingredients, preparation, userId);
  return newRecipe.ops[0];
};

const findUserByEmail = async (email) => {
  const user = await UsersModel.findUserByEmail(email);
  return user;
};

const getRecipes = async () => {
  const recipes = RecipeModel.getRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await RecipeModel.getRecipeByid(id);
  return recipe;
};

const updateRecipe = async (id, body, userId) => {
  const recipe = await RecipeModel.updateRecipe(id, body, userId);
  return recipe;
};

module.exports = {
  createRecipe,
  findUserByEmail,
  getRecipes,
  getRecipeById,
  updateRecipe,
};