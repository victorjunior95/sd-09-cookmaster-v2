const express = require('express');
const UserController = require('../controllers/UsersController');
const RecipeController = require('../controllers/RecipesController');
const getError = require('../middlewares/error');
const { validateUser, validateLogin } = require('../middlewares/validateUser');
const validateRecipe = require('../middlewares/validateRecipe');

const router = express.Router();

router.get('/users', UserController.list);

router.post('/users', validateUser, UserController.register);

router.post('/login', validateLogin, UserController.login);

router.get('/recipes', RecipeController.listRecipes);

router.get('/recipes/:id', RecipeController.listOneRecipe);

router.post('/recipes', validateRecipe, RecipeController.register);

router.use(getError);

module.exports = router;