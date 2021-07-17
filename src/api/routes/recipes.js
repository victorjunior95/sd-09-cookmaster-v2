const express = require('express');
const recipes = require('../controllers/recipes');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.token, validate.recipe, recipes.create);
route.get('/', recipes.getAll);
route.get('/:id', validate.recipeId, recipes.getById);

module.exports = route;
