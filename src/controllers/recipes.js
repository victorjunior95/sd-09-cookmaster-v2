const recipesService = require('../services/recipes');

const createRecipe = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;

  const newRecipe = await recipesService.createRecipes(name, ingredients, preparation, req.user.id);

  return res.status(201).json(newRecipe);
};

const getAll = async (req, res, _next) => {
  const allRecipes = await recipesService.getAll();

  return res.status(200).json(allRecipes);
};

const getRecipe = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await recipesService.getRecipe(id);

  if (recipe.code) return next(recipe);

  return res.status(200).json(recipe);
};

const editRecipe = async (req, res, _next) => {
  const { id } = req.params;
  const { body } = req;

  const newRecipe = await recipesService.editRecipe(id, body);

  return res.status(200).json(newRecipe);
};

module.exports = {
  createRecipe,
  getAll,
  getRecipe,
  editRecipe,
};
