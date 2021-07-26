const express = require('express');
const recipesController = require('../controller/recipesController');
const validateJWT = require('../controller/validateJWT');

const router = express.Router();

router.get('/:id', recipesController.getRecipeById);
router.put('/:id', validateJWT, recipesController.putRecipe);
router.get('/', recipesController.getRecipes);
router.post('/', validateJWT, recipesController.postRecipe);

module.exports = router;
