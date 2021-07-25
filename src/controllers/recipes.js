const rescue = require('express-rescue');

const serviceRecipe = require('../services/recipes');
const modelRecipe = require('../models/recipes');

const ok = 201;
const status = 200;

const create = rescue(async (req, res) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;
  const recipe = await serviceRecipe
    .create(token, name, ingredients, preparation);
  res.status(ok).json(recipe);
});

const getRecipes = rescue(async (_req, res) => {
  const recipe = await modelRecipe.getRecipes();
  res.status(status).json(recipe);
});

const getOne = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await serviceRecipe.getOne(id);
  res.status(status).json(recipe);
});

module.exports = {
  create,
  getRecipes,
  getOne,
};