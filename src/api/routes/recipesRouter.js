const express = require('express');

const { checkRecipeInput } = require('../middlewares/recipesMiddlewares');
const { postNewRecipe, getAllRecipes, getRecipeById } = require('../controllers/recipesController');
const validateToken = require('../auth/validateJWT');

const router = express.Router();

router.post('/', checkRecipeInput, validateToken, postNewRecipe);

router.get('/:id', getRecipeById);

router.get('/', getAllRecipes);

module.exports = router;