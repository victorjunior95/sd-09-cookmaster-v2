const express = require('express');

const validateToken = require('../api/auth/validateToken');
const recipeController = require('../controllers/Recipes');

const router = express.Router();

router.post('/', validateToken, recipeController.registerRecipe);

module.exports = router;
