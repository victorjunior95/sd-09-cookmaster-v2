const express = require('express');
const imagesController = require('../../../controllers/imagesController');

const router = express.Router();

router.get('/:filename', [imagesController.getImageByRecipeId]);

module.exports = router;