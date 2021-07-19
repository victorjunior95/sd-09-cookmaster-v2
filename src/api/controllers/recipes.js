const rescue = require('express-rescue');
const service = require('../services/recipes');
const { CREATED } = require('../constants/http.json');

const create = rescue(async (request, response, next) => {
  const { name, ingredients, preparation } = request.body;
  const { id: userId } = request.user;
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

module.exports = { create };
