const express = require('express');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.post('/', recipesController.newRecipe);
router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipeById);
router.put('/:id/image', recipesController.uploadRecipeImage);
router.put('/:id', recipesController.updateRecipeById);
router.delete('/:id', recipesController.deleteRecipeById);

module.exports = router;