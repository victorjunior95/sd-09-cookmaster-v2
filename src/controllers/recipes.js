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

module.exports = {
  createRecipe,
  getAll,
};
