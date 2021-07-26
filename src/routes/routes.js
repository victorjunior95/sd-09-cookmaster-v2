const express = require('express');
const validateToken = require('../services/validateToken');
const users = require('../controllers/users');
const recipes = require('../controllers/recipes');
const upload = require('../services/upload');

const router = express.Router();

router.post('/users', users.createUser);
router.post('/login', users.login);

router.post('/recipes', validateToken, recipes.createRecipe);
router.get('/recipes', recipes.getRecipes);
router.get('/recipes/:id', recipes.getOneRecipe);
router.put('/recipes/:id', validateToken, recipes.updateRecipe);
router.delete('/recipes/:id', validateToken, recipes.deleteRecipe);
router.put('/recipes/:id/image', validateToken, upload.single('image'), recipes.updateImage);

module.exports = router;