const express = require('express');
const recipesController = require('../controllers/recipesController');
const validate = require('../middlewares/validateRecipesMiddleware');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/recipes', 
validate.validateAllRecipes,
validate.validateJWT,
recipesController.createRecipes);

router.get('/recipes', 
recipesController.getAllRecipes);

router.get('/recipes/:id', 
recipesController.getByRecipes);

router.put('/recipes/:id', 
validateJWT.recipesJWT,
recipesController.updateRecipes);

module.exports = router;
