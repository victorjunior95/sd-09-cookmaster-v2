const recipeService = require('../services/recipeService');

const stateBadRequest = 400;
// const stateOk = 200;
const stateCreated = 201;

const createNewRecipe = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const newRecipe = await recipeService.createRecipe(name, ingredients, preparation, userId);

  if (newRecipe.message) return res.status(stateBadRequest).json(newRecipe);

  return res.status(stateCreated).json(newRecipe);
};

module.exports = {
  createNewRecipe,
};