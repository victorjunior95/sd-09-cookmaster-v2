const recipeService = require('../services/recipeService');

const stateBadRequest = 400;
const stateNotFound = 404;
const stateOk = 200;
const stateCreated = 201;

const createNewRecipe = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const newRecipe = await recipeService.createRecipe(name, ingredients, preparation, userId);

  if (newRecipe.message) return res.status(stateBadRequest).json(newRecipe);

  return res.status(stateCreated).json(newRecipe);
};

const showAllRecipes = async (req, res, _next) => {
  const list = await recipeService.allRecipes();
  return res.status(stateOk).json(list);
};

const findRecipeById = async (req, res, _next) => {
  const { id } = req.params;
  const recipe = await recipeService.findRecipe(id);

  if (recipe.message) return res.status(stateNotFound).json(recipe);

  return res.status(stateOk).json(recipe);
};

module.exports = {
  createNewRecipe,
  showAllRecipes,
  findRecipeById,
};