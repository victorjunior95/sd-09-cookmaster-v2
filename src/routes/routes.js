const express = require('express');
const UsersController = require('../controllers/UsersController');
const RecipesController = require('../controllers/RecipesController');

const router = express.Router();

router.post('/users', UsersController.addNewUser);
router.post('/login', UsersController.userLogin);
router.post('/recipes', RecipesController.addNewRecipe);

module.exports = router;