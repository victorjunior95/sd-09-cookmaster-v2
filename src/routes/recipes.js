const routes = require('express').Router();
const rescue = require('express-rescue');

const recipes = require('../controllers/recipesController');

routes.post('/', rescue(recipes.create));
routes.get('/', rescue(recipes.findAll));
routes.get('/:id', rescue(recipes.findById));

module.exports = routes;
