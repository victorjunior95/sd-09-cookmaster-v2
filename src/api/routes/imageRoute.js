const express = require('express');
const recipeController = require('../controllers/recipeController');

const imageRoute = express.Router();

// mosta imagem
imageRoute.get('/:id.jpg', recipeController.showImage);

module.exports = imageRoute;