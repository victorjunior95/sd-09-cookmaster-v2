const rescue = require('express-rescue');

const createRecipe = rescue(async (req, res, _next) => {
  const addRecipe = req.body;
  return res.status(200).json(addRecipe);
});
const getRecipes = rescue(async (_req, res, _next) => res.status(200).json('all recipes'));

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  return res.status(200).json(id);
});
const updateRecipes = rescue(async (req, res, _next) => {
  const { id } = req.params;
  return res.status(200).json(id);
});
const updateImageRecipes = rescue(async (req, res, _next) => {
  const image = req.params;
  return res.status(200).json(image);
});
const deleteRecipes = rescue(async (req, res, _next) => {
  const { id } = req.params;
  return res.status(200).json(id);
});

module.exports = {
  createRecipe,
  getRecipes,
  getById,
  updateRecipes,
  updateImageRecipes,
  deleteRecipes,
};