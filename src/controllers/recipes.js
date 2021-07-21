const rescue = require('express-rescue');
const Recipe = require('../services/recipes');

const createRecipe = rescue(async (req, res, _next) => {
  const newRecipe = await Recipe.createRecipe(req.body);
  return res.status(201).json({ recipe: newRecipe });
});

const getAllRecipes = rescue(async (_req, res, _next) => {
  const listAllRecipes = await Recipe.listRecipes();
  res.status(200).json(listAllRecipes);
});

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (!recipe) return res.status(404).json({ message: 'recipe not found' });
  return res.status(200).json(recipe);
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
  getAllRecipes,
  getById,
  updateRecipes,
  updateImageRecipes,
  deleteRecipes,
};