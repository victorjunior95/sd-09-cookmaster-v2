const express = require('express');

const recipeRouter = express.Router();

const createRecipe = require('../../controllers/recipes');

recipeRouter.post('/', createRecipe);
recipeRouter.get('/', getRecipes);
recipeRouter.get('/:id', getById);
recipeRouter.put('/:id', updateRecipes);
recipeRouter.put('/:id/image', updateImageRecipes);
recipeRouter.delete('/:id', deleteRecipes);

module.exports = recipeRouter;