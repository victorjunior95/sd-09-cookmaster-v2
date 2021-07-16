const express = require('express');
const multer = require('../multer');
const recipeController = require('../controllers/recipeController');
const {
  validEntries,
  validToken,
  recipeValidation,
} = require('../services/loginService');

const router = express.Router();

router.post('/recipes', validEntries, validToken, recipeController.createRecipe);
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipeById);
router.put('/recipes/:id', recipeValidation, recipeController.updateRecipe);
router.delete('/recipes/:id',
  validToken, recipeValidation, recipeController.deleteRecipe);
router.put('/recipes/:id/image',
  validToken, recipeValidation, multer(), recipeController.uploadImage);

module.exports = router;
