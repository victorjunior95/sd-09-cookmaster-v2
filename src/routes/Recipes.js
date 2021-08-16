const express = require('express');

const validateToken = require('../api/auth/validateToken');
const recipeController = require('../controllers/Recipes');

const router = express.Router();

router.post('/', validateToken, recipeController.registerRecipe);
router.get('/:id', recipeController.getRecipeById);

module.exports = router;
