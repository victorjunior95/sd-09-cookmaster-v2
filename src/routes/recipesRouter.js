const { Router } = require('express');

const recipesController = require('../controllers/rescipesContoller');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

router.route('/')
  .post(validateToken, recipesController.createRecipe);

module.exports = router;
