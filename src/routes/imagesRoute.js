const routes = require('express').Router();
const rescue = require('express-rescue');

const images = require('../controllers/imagesController');

routes.get('/:id', rescue(images.getImage));

module.exports = routes;
