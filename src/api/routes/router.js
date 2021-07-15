const express = require('express');
const userController = require('../controllers/userController');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../auth/validateJWT');
const router = express.Router();
const multer = require('../multer');

router.post('/users', userController.createUser);

router.post('/login', userController.loginUser);

router.post('/recipes', validateJWT, recipesController.createRecipe);

router.get('/recipes', recipesController.getAll);

router.get('/recipes/:id', recipesController.findById);

router.put('/recipes/:id', validateJWT, recipesController.updateOne);

router.delete('/recipes/:id', validateJWT, recipesController.deleteRecipe);

router.put('/recipes/:id/image', validateJWT, multer(), recipesController.addImage);

module.exports = router;
