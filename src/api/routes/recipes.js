const express = require('express');
const controller = require('../controllers/recipes');

const recipes = express.Router();

recipes.post('/', controller.create);

module.exports = recipes;