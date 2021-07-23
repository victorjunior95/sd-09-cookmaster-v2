const express = require('express');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros e passar pro middleware de erros genericos
const upload = require('../middlewares/upload');
const recipesController = require('../controllers/recipesController');

const recipesRouter = express.Router();

recipesRouter.post('/', rescue(recipesController.registerRecipe));
recipesRouter.get('/', rescue(recipesController.getAllRecipes));
recipesRouter.get('/:id', rescue(recipesController.getRecipeById));
recipesRouter.put('/:id', rescue(recipesController.editRecipe));
recipesRouter.put('/:id/image/', upload.single('image'), rescue(recipesController.addRecipeImage));
recipesRouter.delete('/:id', rescue(recipesController.deleteRecipe));

module.exports = recipesRouter;