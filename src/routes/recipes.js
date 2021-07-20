const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares/recipes');

const recipesController = require('../controller/recipes');

router.post(
  '/',
  middlewares.validateData,
  middlewares.tokenValidation,
  middlewares.tokenMalformed,
  recipesController.createRecipes,
);

router.get('/', recipesController.getAllRecipes);
router.get('/:id', middlewares.validateId, recipesController.getRecipesById);
router.put(
  '/:id',
  middlewares.tokenValidation,
  middlewares.tokenMalformed,
  middlewares.TokenAuthorization,
  recipesController.updateRecipes,
);
router.delete(
  '/:id',
  middlewares.tokenValidation,
  recipesController.deleteRecipes,
);

module.exports = router;
