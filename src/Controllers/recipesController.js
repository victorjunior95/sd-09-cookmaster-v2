const rescue = require('express-rescue');
const Recipes = require('../Services/recipesService');

const recipeCreate = rescue(async (req, res) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const recipes = await Recipes.recipeCreate(
    name, ingredients, preparation, userId,
  );

  return res.status(201).json(recipes);
});

const getAll = async (_req, res) => {
  const recipes = await Recipes.getAll();

  return res.status(200).json(recipes);
};

const getOne = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.getOne(id);
  
  return res.status(200).json(recipe);
});

const recipeUpdate = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const recipe = await Recipes.recipeUpdate(id, name, ingredients, preparation);
  
  return res.status(200).json(recipe);
});

const recipeDelete = async (req, res) => {
  const { id } = req.params;
  await Recipes.recipeDelete(id);

  return res.status(204).end();
};

const imageCreate = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const imageCreated = await Recipes.imageCreate(id, path);

  return res.status(200).json(imageCreated);
};

module.exports = {
  recipeCreate,
  getAll,
  getOne,
  recipeUpdate,
  recipeDelete,
  imageCreate,
};