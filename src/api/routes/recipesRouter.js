const express = require('express');

const { checkRecipeInput } = require('../middlewares/recipesMiddlewares');
const { 
  postNewRecipe,
  getAllRecipes,
  getRecipeById,
  deleteRecipeById, 
  updateRecipe} = require('../controllers/recipesController');

const validateToken = require('../auth/validateJWT');

const router = express.Router();

router.post('/', checkRecipeInput, validateToken, postNewRecipe);

router.get('/', getAllRecipes);

router.get('/:id', getRecipeById);

router.put('/:id', validateToken, updateRecipe);
// updateRecipe
// router.delete('/:id', validateToken, deleteRecipeById);

module.exports = router;