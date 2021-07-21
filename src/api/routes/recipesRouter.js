const express = require('express');
const { checkRecipeInput } = require('../middlewares/recipesMiddlewares');
const { postNewRecipe, getAllRecipes } = require('../controllers/recipesController');
const validateToken = require('../auth/validateJWT');

const router = express.Router();

router.post('/', checkRecipeInput, validateToken, postNewRecipe);

router.get('/', getAllRecipes);

module.exports = router;