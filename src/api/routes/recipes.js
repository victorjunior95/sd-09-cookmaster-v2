const express = require('express');
const recipes = require('../controllers/recipes');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', validate.token, recipes.create);
route.get('/', recipes.getAll);
route.get('/:id', recipes.getById);

module.exports = route;