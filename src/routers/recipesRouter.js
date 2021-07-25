const express = require('express');
const rescue = require('express-rescue');
const recipesController = require('../controllers/recipesController');
const upload = require('../controllers/multer');

const recipesRouter = express.Router();

recipesRouter.post('/', rescue(recipesController.addRecipe));

recipesRouter.get('/:id', rescue(recipesController.getRecipeById));
recipesRouter.get('/', rescue(recipesController.getRecipe));

recipesRouter.put('/:id/image', upload.single('image'), rescue(recipesController.addRecipeImage));
recipesRouter.put('/:id', rescue(recipesController.editRecipe));

recipesRouter.delete('/:id', rescue(recipesController.deleteRecipe));

module.exports = recipesRouter;
