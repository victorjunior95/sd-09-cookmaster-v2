const express = require('express');
const RecipesController = require('./recipesController');
const { validateAuth, validateRecipe } = require('./recipesMiddleware');

const recipesRouter = express.Router();

recipesRouter.post('/', validateAuth, validateRecipe, RecipesController.create);
recipesRouter.get('/', RecipesController.getAll);

module.exports = recipesRouter;
