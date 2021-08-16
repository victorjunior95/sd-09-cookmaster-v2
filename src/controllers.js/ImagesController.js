const express = require('express');
const mdw = require('../middlewares');

const imagesRouter = express.Router();

imagesRouter.get('/:idRecipe',
  mdw.mdwImages.getRecipeImage);

module.exports = imagesRouter;
