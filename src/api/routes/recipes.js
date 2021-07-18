const router = require('express').Router();
const { recipesController } = require('../controllers');
const middlewares = require('../middlewares');

// Create a recipe
router.post('/', middlewares.authentication, recipesController.create);

// Get all recipes
router.get('/', recipesController.getAll);

module.exports = router;
