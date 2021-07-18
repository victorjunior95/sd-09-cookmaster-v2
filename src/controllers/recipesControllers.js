const recipesServices = require('../services/recipesServices');

const {
  code: { CREATED, OK, NOT_FOUND },
  message: { RECIPE_NOT_FOUND },
} = require('../utils');

const createRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const newRecipe = await recipesServices.createRecipes(name, ingredients, preparation, userId);

  return res.status(CREATED).json(newRecipe);
};

const getAllRecipes = async (req, res) => {
  const allRecipes = await recipesServices.getAllRecipes();
  if (!allRecipes.length) return res.status(204).json({ message: RECIPE_NOT_FOUND });

  return res.status(OK).json(allRecipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.getRecipeById(id);
  if (!recipe) return res.status(NOT_FOUND).json({ message: RECIPE_NOT_FOUND });

  return res.status(OK).json(recipe);
};

const editRecipeById = async (req, res) => {
  const { id: recipeId } = req.params;
  const { body: payload } = req;
  const { _id: userId } = req.user;

  const editedRecipe = await recipesServices.editRecipeById(recipeId, userId, payload);

  return res.status(OK).json(editedRecipe);
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
};