const RecipesModel = require('../models/RecipesModel');
const { verifyToken, validateError } = require('../middlewares/validateUser');

const listAllRecipes = async () => {
  const users = await RecipesModel.listAllRecipes();
  
  return users;
};

const findById = async (id) => {
  const comps = await RecipesModel.findById(id);
  if (!comps) throw validateError(401, 'recipe not found');
  return comps;
};

const registerRecipe = async (token, { name, ingredients, preparation }) => {
  const validVerifyToken = await verifyToken(token);
  if (validVerifyToken.message) throw validateError(401, validVerifyToken.message);
  const { userId } = validVerifyToken;
  const newRecipe = await RecipesModel.registerRecipe({ name, ingredients, preparation, userId });

  return newRecipe;
};

module.exports = {
  registerRecipe,
  listAllRecipes,
  findById,
};