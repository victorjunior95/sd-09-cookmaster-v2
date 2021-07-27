const express = require('express');

const Controller = require('../controllers/RecipesController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.post('/', validateToken, Controller.createRecipe);
router.get('/', Controller.findAll);
router.get('/:id', Controller.findRecipe);
router.put('/:id', validateToken, Controller.updateOne);
router.delete('/:id', validateToken, Controller.deleteOne);

module.exports = router;