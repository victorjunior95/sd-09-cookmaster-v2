const express = require('express');
const RecipesController = require('./recipesController');
const { validateAuth, validateRecipe, validateRecipeId } = require('./recipesMiddleware');

const recipesRouter = express.Router();

recipesRouter.post('/', validateAuth, validateRecipe, RecipesController.create);
recipesRouter.get('/', RecipesController.getAll);
recipesRouter.get('/:id', validateRecipeId, RecipesController.getById);
recipesRouter.put('/:id', validateAuth, validateRecipeId, RecipesController.update);
recipesRouter.delete('/:id', validateAuth, validateRecipeId, RecipesController.remove);

module.exports = recipesRouter;
