const express = require('express');

const router = express.Router();

const tokenValidation = require('../middlewares/tokenValidation');
const recipesControllers = require('../controllers/recipesControllers');
const recipeValidation = require('../middlewares/recipeValidation');

router.post('/', tokenValidation, recipeValidation, recipesControllers.registerRecipe);

router.get('/', recipesControllers.getAllRecipes);

router.get('/:id', recipesControllers.getRecipeById);

module.exports = router;
