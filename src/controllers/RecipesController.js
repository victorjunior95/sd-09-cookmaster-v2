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

module.exports = RecipesRouter;