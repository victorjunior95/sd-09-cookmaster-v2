const express = require('express');
const upload = require('../middlewares/upload');

const validateUser = require('../schemas/validateUser');
const validateLogin = require('../schemas/validateLogin');
const validateRecipe = require('../schemas/validateRecipe');
const validateToken = require('../schemas/validateToken');
const createToken = require('../schemas/createToken');
const authToEdit = require('../schemas/authToEdit');
const validateAdmin = require('../schemas/validateAdmin');

const usersControllers = require('../controllers/usersControllers');
const recipesControllers = require('../controllers/recipesControllers');

const router = express.Router();

router.use('/users/admin', validateUser, validateToken, validateAdmin,
  usersControllers.createAdmin);
router.use('/users', validateUser, usersControllers.createUser);
router.post('/login', validateLogin, createToken, usersControllers.login);
router.post('/recipes', validateRecipe, validateToken, recipesControllers.createRecipes);

router.get('/recipes', recipesControllers.getAllRecipes);
router.get('/recipes/:id', recipesControllers.getRecipeById);

router.put('/recipes/:id', validateToken, authToEdit, recipesControllers.editRecipeById);
router.delete('/recipes/:id', validateToken, authToEdit, recipesControllers.deleteRecipeById);

// router.get('/images/:id', recipesControllers.getRecipeImagesById);
router.use('/recipes/:id/image/',
  validateToken, authToEdit, upload, recipesControllers.uploadImage);

module.exports = router;
