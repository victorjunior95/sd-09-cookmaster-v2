const express = require('express');

const validateToken = require('../api/auth/validateToken');
const validateUser = require('../api/auth/validateUser');
const recipeController = require('../controllers/Recipes');

const router = express.Router();

router.post('/', validateToken, recipeController.registerRecipe);
router.get('/', recipeController.getAllRecipe);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', validateToken, validateUser, recipeController.updateRecipe);
router.delete('/:id', validateToken, validateUser, recipeController.deleteRecipe);

module.exports = router;
