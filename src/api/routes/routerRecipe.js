const express = require('express');

const Controller = require('../controllers/RecipesController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.post('/', validateToken, Controller.createRecipe);

module.exports = router;