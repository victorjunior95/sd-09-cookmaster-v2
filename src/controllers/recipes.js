const rescue = require('express-rescue');
const Recipe = require('../services/recipes');

const createRecipe = rescue(async (req, res, _next) => {
  const { _id: userId } = req.user;
  const { name, ingredients, preparation, _id: id } = await Recipe.createRecipe(req.body, userId);
  const result = { _id: id, name, ingredients, preparation, userId };

  return res.status(201).json({ recipe: result });
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
  const { user } = req;
  const recipe = await Recipe.updateRecipes(id, req.body, user);

  return res.status(200).json(recipe);
});

const updateImageRecipes = rescue(async (req, res, _next) => {
  const { path } = req.file;
  const { id } = req.params;
  const { user } = req;
  const url = `localhost:3000/${path}`;
  const response = await Recipe.updateImage(url, id, user);

  res.status(200).json(response);
});

const deleteRecipes = rescue(async (req, res, _next) => {
  const { id } = req.params;
  await Recipe.deleteRecipe(id);
  return res.status(204).json();
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  updateRecipes,
  updateImageRecipes,
  deleteRecipes,
};