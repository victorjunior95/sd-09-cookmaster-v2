const express = require('express');
const path = require('path');
const RecipesController = require('../controllers/Recipes');
const Auth = require('../auth/tokenValidator');

const Router = express.Router();

Router.use('/image', express.static(path.join('__dirname', '..', 'uploads')));

Router.delete('/:id', Auth.tokenValidator, RecipesController.deleteRecipe);

Router.get('/:id', RecipesController.getRecipeById);

Router.get('/', RecipesController.getAllRecipes);

Router.post('/', Auth.tokenValidator, RecipesController.createRecipe);

Router.put(
  '/:id/image',
  Auth.tokenValidator,
  RecipesController.insertImage,
);

Router.put('/:id', Auth.tokenValidator, RecipesController.editRecipe);

module.exports = Router;