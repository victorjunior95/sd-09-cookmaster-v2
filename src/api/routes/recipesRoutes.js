const express = require('express');
const recipesController = require('../../../controllers/recipesController');
const {
  validateToken,
  validateRecipesFields,
} = require('../../../middlewares');

const router = express.Router();

router.post('/', [
  validateToken,
  validateRecipesFields,
  recipesController.add,
]);

router.get('/', [recipesController.getAll]);
router.get('/:id', [recipesController.getById]);

router.put('/:id', [validateToken, recipesController.update]);

module.exports = router;
