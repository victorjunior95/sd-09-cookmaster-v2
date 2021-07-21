const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const recipesController = require('../controllers/recipesController');

const recipesRouter = express.Router();

recipesRouter.post('/', rescue(recipesController.registerRecipe));
recipesRouter.get('/', rescue(recipesController.getAllRecipes));

module.exports = recipesRouter;