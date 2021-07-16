const express = require('express');
const UserController = require('../controller/userController');
const LoginController = require('../controller/loginController');
const RecipesController = require('../controller/recipeController');

const router = express.Router();

router.use('/users', UserController);

router.use('/login', LoginController);

router.use('/recipes', RecipesController);

module.exports = router;