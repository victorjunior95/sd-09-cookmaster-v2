const express = require('express');
const mdw = require('../middlewares');

const recipesRouter = express.Router();

recipesRouter.get('/', mdw.mdwRecipes.recipes);

module.exports = recipesRouter;
