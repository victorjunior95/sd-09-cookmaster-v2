const express = require('express');

const router = express.Router();

const tokenValidation = require('../middlewares/tokenValidation');
const recipesControllers = require('../controllers/recipesControllers');
const recipeValidation = require('../middlewares/recipeValidation');
const upload = require('../middlewares/multer');

router.post('/', tokenValidation, recipeValidation, recipesControllers.registerRecipe);

router.get('/', recipesControllers.getAllRecipes);

router.get('/:id', recipesControllers.getRecipeById);

router.put('/:id', tokenValidation, recipesControllers.updateRecipe);

router.delete('/:id', tokenValidation, recipesControllers.deleteRecipe);

router.put(
    '/:id/image',
    tokenValidation,
    upload.single('image'),
    recipesControllers.addImageToRecipe,
  );

module.exports = router;
