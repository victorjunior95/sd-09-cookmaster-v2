const express = require('express');

const tokenValidaton = require('../middlewares/tokenValidation');

const recipeController = require('../controllers/recipeController');

const recipeRouter = express.Router();

recipeRouter.post('/', tokenValidaton, recipeController.createRecipe);

recipeRouter.get('/', recipeController.getAllRecipes);

module.exports = recipeRouter;
