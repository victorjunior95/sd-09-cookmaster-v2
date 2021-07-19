const express = require('express');

const recipeRouter = express.Router();

const createRecipe = require('../../controllers/recipes');

recipeRouter.post('/', createRecipe);

module.exports = recipeRouter;