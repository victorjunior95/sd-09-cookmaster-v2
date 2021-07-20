const { Router } = require('express');

const recipesController = require('../controllers/rescipesContoller');

const router = Router();

router.route('/')
  .post(recipesController.createRecipe);

module.exports = router;
