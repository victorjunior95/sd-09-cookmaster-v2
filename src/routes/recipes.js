const routes = require('express').Router();
const rescue = require('express-rescue');
const multer = require('multer');
const multerConfig = require('../config/multer');

const recipes = require('../controllers/recipesController');

routes.post('/', rescue(recipes.create));
routes.get('/', rescue(recipes.findAll));
routes.get('/:id', rescue(recipes.findById));
routes.put('/:id', rescue(recipes.update));
routes.delete('/:id', rescue(recipes.exclude));
routes.put('/:id/image', multer(multerConfig).single('image'), rescue(recipes.addImage));

module.exports = routes;
