const express = require('express');
const { createRecipe,
  getAllRecipes,
  getById,
  updateRecipes,
  updateImageRecipes,
  deleteRecipes,
} = require('../../controllers/recipes');

const recipeRouter = express.Router();

recipeRouter.post('/', createRecipe);
recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', getById);
recipeRouter.put('/:id', updateRecipes);
recipeRouter.put('/:id/image', updateImageRecipes);
recipeRouter.delete('/:id', deleteRecipes);

module.exports = recipeRouter;