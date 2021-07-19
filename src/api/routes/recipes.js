const express = require('express');
const controller = require('../controllers/recipes');
const tokenValidate = require('../middlewares/tokenValidate');

const recipes = express.Router();

recipes.post('/', tokenValidate, controller.create);

recipes.get('/', controller.find);

recipes.get('/:id', controller.findOne);

recipes.put('/:id', controller.update);

module.exports = recipes;