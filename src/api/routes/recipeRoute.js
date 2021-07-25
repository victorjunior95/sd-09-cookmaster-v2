const express = require('express');
const recipeController = require('../controllers/recipeController');
const validateJwt = require('../controllers/validateJwt');

const recipeRoute = express.Router();

// cria nova receitas
recipeRoute.post('/', validateJwt, recipeController.createNewRecipe);

// lista todos os repipes
recipeRoute.get('/', recipeController.showAllRecipes);

// busca receita por id
recipeRoute.get('/:id', recipeController.findRecipeById);

// atualiza recieta
recipeRoute.put('/:id', validateJwt, recipeController.updateRecipeData);

// deleta inicial
recipeRoute.delete('/:id', validateJwt, recipeController.deleteRecipeData);

// adciona imagem a receita
recipeRoute.put('/:id/image', validateJwt, recipeController.addNewRecipeImage);

module.exports = recipeRoute;
