const express = require('express');
const validateUser = require('../schemas/validateUser');
const validateLogin = require('../schemas/validateLogin');
const validateRecipe = require('../schemas/validateRecipe');
const validateToken = require('../schemas/validateToken');
const createToken = require('../schemas/createToken');
const authToEdit = require('../schemas/authToEdit');

const usersControllers = require('../controllers/usersControllers');
const recipesControllers = require('../controllers/recipesControllers');

const router = express.Router();

router.post('/users', validateUser, usersControllers.createUser);
router.post('/login', validateLogin, createToken, usersControllers.login);
router.post('/recipes', validateRecipe, validateToken, recipesControllers.createRecipes);

router.get('/recipes', recipesControllers.getAllRecipes);
router.get('/recipes/:id', recipesControllers.getRecipeById);

router.put('/recipes/:id', validateToken, authToEdit, recipesControllers.editRecipeById);

module.exports = router;
