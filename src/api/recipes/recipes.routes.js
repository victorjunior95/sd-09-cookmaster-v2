const Router = require('express').Router();
const { addRecipe } = require('./recipes.controller');

Router.route('/')
  .post(addRecipe);

module.exports = Router;
