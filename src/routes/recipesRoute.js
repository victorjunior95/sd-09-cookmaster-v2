const express = require('express');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.post('/', recipesController.newRecipe);
router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipeById);

module.exports = router;