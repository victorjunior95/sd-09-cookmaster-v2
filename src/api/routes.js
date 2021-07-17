const express = require('express');
const validateUser = require('../schemas/validateUser');
const validateLogin = require('../schemas/validateLogin');
const validateRecipe = require('../schemas/validateRecipe');
const validateToken = require('../schemas/validateToken');
const createToken = require('../schemas/createToken');

const usersControllers = require('../controllers/usersControllers');
const recipesControllers = require('../controllers/recipesControllers');

const router = express.Router();

router.use('/login', validateLogin, createToken, usersControllers.login);
router.post('/users', validateUser, usersControllers.createUser);
router.use('/recipes', validateRecipe, validateToken, recipesControllers.createRecipes);

module.exports = router;
