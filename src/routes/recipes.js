const express = require('express');

const tokenValidaton = require('../middlewares/tokenValidation');

const recipeController = require('../controllers/recipeController');

const recipeRouter = express.Router();

recipeRouter.post('/', tokenValidaton, recipeController.createRecipe);

recipeRouter.get('/', recipeController.getAllRecipes);
recipeRouter.get('/:id', recipeController.getRecipeById);
recipeRouter.put('/:id', tokenValidaton, recipeController.updateRecipe);
recipeRouter.delete('/:id', tokenValidaton, recipeController.deleteRecipe);
recipeRouter.put('/:id/image', tokenValidaton, recipeController.uploadImage);

module.exports = recipeRouter;
