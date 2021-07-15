const express = require('express');
const mdw = require('../middlewares');

const imagesRouter = express.Router();

imagesRouter.get('/', mdw.mdwImages.img);

module.exports = imagesRouter;
