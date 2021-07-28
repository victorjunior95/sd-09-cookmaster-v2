const express = require('express');
const recipe = require('../controllers/recipesController');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.token, validate.recipe, recipe.create);
route.get('/', recipe.getAll);
route.get('/:id', validate.recipeId, recipe.getById);
route.put('/:id', validate.token, recipe.update);
route.delete('/:id', validate.token, recipe.remove);
route.put('/:id/image', validate.token, recipe.setImage);

module.exports = route;
