const express = require('express');

const tokenValidaton = require('../middlewares/tokenValidation');

const recipeController = require('../controllers/recipeController');

const recipeRouter = express.Router();

recipeRouter.post('/', tokenValidaton, recipeController.createRecipe);

recipeRouter.get('/', recipeController.getAllRecipes);
recipeRouter.get('/:id', recipeController.getRecipeById);
recipeRouter.put('/:id', tokenValidaton, recipeController.updateRecipe);

module.exports = recipeRouter;
