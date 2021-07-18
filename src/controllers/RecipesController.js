const express = require('express');
const rescue = require('express-rescue');

const authorization = require('../middlewares/authorization');

const RecipesRouter = express.Router();

const RecipesService = require('../services/RecipesService');

RecipesRouter.post('/', rescue(authorization), rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const newRecipe = await RecipesService.createRecipe(name, ingredients, preparation, _id);
  return res.status(201).json(newRecipe);
}));

RecipesRouter.get('/', rescue(async (req, res) => {
  const allRecipes = await RecipesService.getAllRecipes();
  return res.status(200).json(allRecipes);
}));

RecipesRouter.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const oneRecipe = await RecipesService.getOneRecipe(id);
  return res.status(200).json(oneRecipe);
}));

module.exports = RecipesRouter;