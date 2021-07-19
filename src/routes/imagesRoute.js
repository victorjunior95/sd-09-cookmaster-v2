const express = require('express');
const rescue = require('express-rescue');
const path = require('path');

const imagesRoute = express.Router();

imagesRoute.get('/:imageName', rescue(express.static(path.join(__dirname, '..', 'uploads'))));

module.exports = imagesRoute;
