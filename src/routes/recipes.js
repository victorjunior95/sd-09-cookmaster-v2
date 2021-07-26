const router = require('express').Router();
const rescue = require('express-rescue');
const controllerRecipe = require('../controllers/recipes');

router.post('/', rescue(controllerRecipe.create));
router.get('/', rescue(controllerRecipe.find));
router.get('/:id', rescue(controllerRecipe.findById));
router.put('/:id', rescue(controllerRecipe.update));
router.delete('/:id', rescue(controllerRecipe.exclude));

module.exports = router;