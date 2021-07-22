const express = require('express');
const validateJWT = require('../../api/auth/validateJWT');

const { createRecipe,
  getAllRecipes,
  getById,
  updateRecipes,
  updateImageRecipes,
  deleteRecipes,
} = require('../../controllers/recipes');

const recipeRouter = express.Router();

recipeRouter.post('/', validateJWT, createRecipe);
recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', validateJWT, getById);
recipeRouter.put('/:id', validateJWT, updateRecipes);
recipeRouter.put('/:id/image', validateJWT, updateImageRecipes);
recipeRouter.delete('/:id', validateJWT, deleteRecipes);

module.exports = recipeRouter;