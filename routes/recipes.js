const express = require('express');
const { postRecipe, getRecipes } = require('../controller/recipesController');
const validateJWT = require('../controller/validateJWT');

const router = express.Router();

router.get('/', getRecipes);
router.post('/', validateJWT, postRecipe);

module.exports = router;
