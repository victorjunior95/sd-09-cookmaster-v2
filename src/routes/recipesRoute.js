const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../api/validateToken');
const recipesController = require('../controllers/recipesController');

const recipesRoute = express.Router();

recipesRoute.post('/', rescue(validateToken), rescue(recipesController.createRecipe));

module.exports = recipesRoute;
