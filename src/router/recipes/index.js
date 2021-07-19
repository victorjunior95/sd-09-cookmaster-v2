const express = require('express');
const { createRecipe,
  getRecipes,
  getById,
  updateRecipes,
  updateImageRecipes,
  deleteRecipes,
} = require('../../controllers/recipes');

const recipeRouter = express.Router();

recipeRouter.post('/', createRecipe);
recipeRouter.get('/', getRecipes);
recipeRouter.get('/:id', getById);
recipeRouter.put('/:id', updateRecipes);
recipeRouter.put('/:id/image', updateImageRecipes);
recipeRouter.delete('/:id', deleteRecipes);

module.exports = recipeRouter;