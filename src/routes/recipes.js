const express = require('express');

const router = express.Router();

const fieldsValidation = require('../middleware/fieldsValidation');
const validateToken = require('../middleware/validateToken');
const recipesController = require('../controller/recipesController');

router.post('/',
  validateToken,
  (req, res, next) => fieldsValidation(['name', 'ingredients', 'preparation'], req, res, next),
  recipesController.registerRecipe);

router.get('/:id',
  recipesController.getRecipeById);
    
router.get('/',
  recipesController.getRecipes);

router.put('/:id',
validateToken,
recipesController.editRecipeById);

module.exports = router;
