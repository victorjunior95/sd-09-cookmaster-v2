const express = require('express');
const RecipesController = require('./recipesController');
const { validateAuth, validateRecipe, validateRecipeId } = require('./recipesMiddleware');

const recipesRouter = express.Router();

recipesRouter.post('/', validateAuth, validateRecipe, RecipesController.create);
recipesRouter.get('/', RecipesController.getAll);
recipesRouter.get('/:id', validateRecipeId, RecipesController.getById);

module.exports = recipesRouter;
