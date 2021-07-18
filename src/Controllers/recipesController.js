const recipesService = require('../services/recipesService');

const create = async (req, res) => {
  const newRecipe = await recipesService.create(req.user, req.body);
  return res.status(201).json(newRecipe);
};

const getAll = async (_req, res) => {
  const recipes = await recipesService.getAll();
  return res.status(200).json(recipes);
};

module.exports = {
  create,
  getAll,
};
