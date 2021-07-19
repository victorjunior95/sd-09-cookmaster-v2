const rescue = require('express-rescue');
const Recipe = require('../services/Recipes');

const STATUS = {
  CREATED: 201,
  OK: 200,
  NOCONTENT: 204,
};

const registerRecipe = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  console.log(userId);
  const newRecipe = await Recipe.registerRecipe(name, ingredients, preparation, userId);

  if (newRecipe.message) return next(newRecipe);

  return res.status(STATUS.CREATED).json(newRecipe);
});

const listRecipes = rescue(async (_req, res, _next) => {
  const recipeList = await Recipe.listRecipes();

  return res.status(STATUS.OK).json(recipeList);
});

const getRecipeById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const recipe = await Recipe.getRecipeById(id);

  if (recipe.message) return next(recipe);

  return res.status(STATUS.OK).json(recipe);
});

const editRecipe = rescue(async (req, res, next) => {
  const { id } = req.params;

  const { name, ingredients, preparation } = req.body;

  const recipe = await Recipe.editRecipe(id, name, ingredients, preparation);

  if (recipe.message) return next(recipe);

  return res.status(STATUS.OK).json(recipe);
});

const deleteRecipe = rescue(async (req, res, next) => {
  const { id } = req.params;

  const recipe = await Recipe.deleteRecipe(id);

  if (recipe) return next(recipe);

  return res.status(STATUS.NOCONTENT).end();
});

module.exports = {
  registerRecipe,
  listRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};
