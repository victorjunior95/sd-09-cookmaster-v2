const express = require('express');
const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.post('/', recipesController.newRecipe);
router.get('/', (req, res, _next) => {
  res.status(200).json('teste');
});

module.exports = router;