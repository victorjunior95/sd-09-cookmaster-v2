const express = require('express');
const rescue = require('express-rescue');

const recipeController = require('../controller/recipe');

const router = express.Router();

router.post(
  '/',
  rescue(recipeController.newRecipeController),
);

module.exports = router;
