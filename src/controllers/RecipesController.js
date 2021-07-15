const express = require('express');
const mdw = require('../middlewares');

const recipesRouter = express.Router();

recipesRouter.post('/',
  mdw.mdwLogin.loginTokenValidator,
  mdw.mdwRecipes.newRecipeValidator,
  mdw.mdwRecipes.newRecipeAdd);

module.exports = recipesRouter;
