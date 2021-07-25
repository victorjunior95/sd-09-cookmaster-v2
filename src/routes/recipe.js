const express = require('express');
const rescue = require('express-rescue');

const recipeController = require('../controller/recipe');

const router = express.Router();

router.post(
  '/',
  rescue(recipeController.newRecipeController),
);

router.get(
  '/',
  rescue(recipeController.listRecipesController),
);

router.get(
  '/:id',
  rescue(recipeController.recipeByIdController),
);

router.put(
  '/:id',
  rescue(recipeController.editedRecipeController),
);

router.delete(
  '/:id',
  rescue(recipeController.excludeRecipeController),
);

module.exports = router;
