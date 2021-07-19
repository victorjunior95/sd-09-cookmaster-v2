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

const findOne = rescue(async (request, response, next) => {
  const { id } = request.params;
  const Recipe = await service.findOne(id);
  if (Recipe.err) return next(Recipe.err);
  response.status(OK).json(Recipe);
});

const update = rescue(async (request, response, next) => {
  const { params: { id }, user: { _id, role }, body: { name, ingredients, preparation } } = request;
  const { _id: recipeUserId } = await service.findOne(id);
  if (recipeUserId === _id || role === 'admin') {
    const newRecipe = await service.update({ name, ingredients, preparation });
    if (newRecipe.err) return next(newRecipe.err);
    response.status(OK).json(newRecipe);
  }
});

module.exports = { create, find, findOne, update };
