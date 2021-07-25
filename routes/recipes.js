const express = require('express');
const { postRecipe } = require('../controller/recipesController');
const validateJWT = require('../controller/validateJWT');

const router = express.Router();

router.post('/', validateJWT, postRecipe);

module.exports = router;
