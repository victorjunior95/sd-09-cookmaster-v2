const express = require('express');
const recipesController = require('../controller/recipesController');

const router = express.Router();

router.get('/:id', recipesController.getRecipeById);
router.put('/:id', recipesController.putRecipe);
router.delete('/:id', recipesController.deleteRecipe);
router.get('/', recipesController.getRecipes);
router.post('/', recipesController.postRecipe);

module.exports = router;
