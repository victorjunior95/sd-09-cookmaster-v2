const express = require('express');

const router = express.Router();

const controller = require('../controller/image');

router.get('/:id', 
controller.getRecipeImage);

module.exports = router;
