const router = require('express').Router();
const controllerRecipe = require('../controllers/recipes');

router.post('/', controllerRecipe.create);
router.get('/', controllerRecipe.getRecipes);
router.get('/:id', controllerRecipe.getOne);

module.exports = router;