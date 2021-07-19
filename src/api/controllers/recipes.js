const rescue = require('express-rescue');
const service = require('../services/recipes');
const { CREATED, OK } = require('../constants/http.json');

const create = rescue(async (request, response, next) => {
  const { name, ingredients, preparation } = request.body;
  const { _id: userId } = request.user;
  const newRecipe = await service
    .create({ name, ingredients, preparation, userId });
  if (newRecipe.err) return next(newRecipe.err);
  response.status(CREATED).json({
    recipe: {
      _id: newRecipe,
      name,
      ingredients,
      preparation,
      userId,
    },
  });
});

const find = rescue(async (request, response, next) => {
  const Recipes = await service.find(request.query);
  if (Recipes.err) return next(Recipes.err);
  response.status(OK).json(Recipes);
});

module.exports = { create, find };
