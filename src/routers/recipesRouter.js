const express = require('express');
const path = require('path');
const recipesController = require('../controllers/recipesController');
const validate = require('../middlewares/validateRecipesMiddleware');
const validateJWT = require('../middlewares/validateJWT');
const upload = require('../middlewares/upload');

const router = express.Router();

router.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

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

router.delete('/recipes/:id',
  validateJWT.recipesJWT,
  recipesController.deleteById);

router.put('/recipes/:id/image',
  upload.single('image'),
  validateJWT.recipesJWT,
  recipesController.AddImageRecipe);

module.exports = router;
