const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../api/validateToken');
const recipesController = require('../controllers/recipesController');

const recipesRoute = express.Router();

recipesRoute.post('/', rescue(validateToken), rescue(recipesController.createRecipe));
recipesRoute.get('/', rescue(recipesController.getAllRecipes));
recipesRoute.get('/:id', rescue(recipesController.findRecipe));
recipesRoute.put('/:id', rescue(validateToken), rescue(recipesController.editRecipe));

module.exports = recipesRoute;
