const express = require('express');
const { checkRecipeInput } = require('../middlewares/recipesMiddlewares');
const { postNewRecipe } = require('../controllers/recipesController');
const validateToken = require('../auth/validateJWT');

const router = express.Router();

router.post('/', checkRecipeInput, validateToken, postNewRecipe);

module.exports = router;