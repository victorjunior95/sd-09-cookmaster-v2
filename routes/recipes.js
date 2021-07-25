const express = require('express');
const recipesController = require('../controller/recipesController');
const validateJWT = require('../controller/validateJWT');

const router = express.Router();

router.get('/', recipesController.getRecipes);
router.post('/', validateJWT, recipesController.postRecipe);

module.exports = router;
