const express = require('express');
const recipe = require('../controllers/recipesController');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.token, validate.recipe, recipe.createRecipe);
route.get('/', recipe.recipesList);
route.get('/:id', validate.recipeId, recipe.getRecipeById);
route.put('/:id', validate.token, recipe.updateRecipe);
route.delete('/:id', validate.token, recipe.removeRecipe);
route.put('/:id/image', validate.token, recipe.setImageRecipe);

module.exports = route;
