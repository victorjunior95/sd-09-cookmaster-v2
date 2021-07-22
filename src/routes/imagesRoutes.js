const express = require('express');
const imagesControllers = require('../controllers/imagesController');

const userRouters = express.Router();

userRouters.get('/:id', imagesControllers.showImage);

module.exports = userRouters;