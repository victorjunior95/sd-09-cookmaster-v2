const express = require('express');

const middlewares = require('../middlewares');
const { recipe } = require('../controllers');

const router = express.Router();

router.post('/', middlewares.auth, recipe.addRecipe);
router.get('/', recipe.getRecipes);

router.get('/:id', recipe.getRecipeById);
router.put('/:id', middlewares.auth, recipe.updateRecipe);
router.delete('/:id', middlewares.auth, recipe.deleteRecipe);

module.exports = router;
