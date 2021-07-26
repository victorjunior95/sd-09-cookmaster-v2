const express = require('express');
const recipesController = require('../controller/recipesController');

const router = express.Router();

router.post('/', recipesController.postRecipe);
router.get('/', recipesController.getRecipes);
router.get('/:id', recipesController.getRecipeById);
router.put('/:id', recipesController.putRecipe);
router.delete('/:id', recipesController.deleteRecipe);
router.put('/:id/image/', recipesController.uploadRecipeImage);

module.exports = router;
