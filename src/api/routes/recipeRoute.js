const express = require('express');
const recipeController = require('../controllers/recipeController');
const validateJwt = require('../controllers/validateJwt');

const recipeRoute = express.Router();

// cria nova receitas
recipeRoute.post('/', validateJwt, recipeController.createNewRecipe);

// lista todos os repipes
recipeRoute.get('/', recipeController.showAllRecipes);

module.exports = recipeRoute;