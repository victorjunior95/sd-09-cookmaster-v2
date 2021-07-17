const routes = require('express').Router();
const rescue = require('express-rescue');

const recipes = require('../controllers/recipesController');

routes.post('/', rescue(recipes.create));

module.exports = routes;
