const recipesServices = require('../services/recipesServices');

const {
  code: { CREATED, OK },
  message: { RECIPE_NOT_FOUND },
} = require('../utils');

const createRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;
  const newRecipe = await recipesServices.createRecipes(name, ingredients, preparation, userId);

  return res.status(CREATED).json(newRecipe);
};

const getAllRecipes = async (req, res) => {
  const allRecipes = await recipesServices.getAllRecipes();
  if (!allRecipes.length) return res.status(204).json({ message: RECIPE_NOT_FOUND });

  return res.status(OK).json(allRecipes);
};

module.exports = {
  createRecipes,
  getAllRecipes,
};