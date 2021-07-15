const express = require('express');
const mdw = require('../middlewares');

const recipesRouter = express.Router();

recipesRouter.get('/', mdw.mdwRecipes.recipesGetAll);
recipesRouter.get('/:id', mdw.mdwRecipes.recipesGetOne);
recipesRouter.post('/',
  mdw.mdwLogin.loginTokenValidator,
  mdw.mdwRecipes.newRecipeValidator,
  mdw.mdwRecipes.newRecipeAdd);

module.exports = recipesRouter;
