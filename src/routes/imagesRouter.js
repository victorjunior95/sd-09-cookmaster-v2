const express = require('express');

const imagesRouter = express.Router();

const { getImageController } = require('../controllers/recipesController');

imagesRouter.get('/:id', getImageController);

module.exports = imagesRouter;
