const rescue = require('express-rescue');
const Recipe = require('../services/Recipes');

const STATUS = {
  CREATED: 201,
  OK: 200,
};

const registerRecipe = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  console.log(userId);
  const newRecipe = await Recipe.registerRecipe(name, ingredients, preparation, userId);

  if (newRecipe.message) return next(newRecipe);

  return res.status(STATUS.CREATED).json(newRecipe);
});

module.exports = {
  registerRecipe,
};
