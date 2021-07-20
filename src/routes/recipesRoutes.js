const express = require('express');
const recipesControllers = require('../controllers/recipesController');
const validate = require('../api/jwt');

const userRouters = express.Router();

userRouters.post('/', validate.validateToken, recipesControllers.addRecipe);

userRouters.get('/', recipesControllers.listAllRecipes);

userRouters.get('/:id', recipesControllers.listOneRecipe);

module.exports = userRouters;
