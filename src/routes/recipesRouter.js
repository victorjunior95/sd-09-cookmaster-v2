const { Router } = require('express');

const recipesController = require('../controllers/rescipesContoller');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

router.route('/')
  .post(validateToken, recipesController.createRecipe)
  .get(recipesController.findAll);

router.route('/:id')
  .get(recipesController.findById)
  .put(validateToken, recipesController.update)
  .delete(validateToken, recipesController.deleteRecipe);

module.exports = router;
