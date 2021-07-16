const RecipesModel = require('../models/RecipesModel');
const { verifyToken, validateError } = require('../middlewares/validateUser');

const listAllRecipes = async () => {
  const Recipes = await RecipesModel.listAllRecipes();
  
  return Recipes;
};

const findById = async (id) => {
  const Recipe = await RecipesModel.findById(id);
  if (!Recipe) throw validateError(401, 'recipe not found');
  return Recipe;
};

const registerRecipe = async (token, { name, ingredients, preparation }) => {
  const validVerifyToken = await verifyToken(token);
  if (validVerifyToken.message) throw validateError(401, validVerifyToken.message);
  const { id } = validVerifyToken;
  const newRecipe = await RecipesModel.registerRecipe({
    name, ingredients, preparation, userId: id,
  });
  return newRecipe;
};

const update = async (token, { id, name, ingredients, preparation }) => {
  if (!token) throw validateError(401, 'missing auth token');
  const validVerifyToken = await verifyToken(token);
  if (validVerifyToken.message) throw validateError(401, validVerifyToken.message);
  const insertedId = await RecipesModel.update({ id, name, ingredients, preparation });
  return insertedId;
};

const remove = async (token, id) => {
  if (!token) throw validateError(401, 'missing auth token');
  const validVerifyToken = await verifyToken(token);
  if (validVerifyToken.message) throw validateError(401, validVerifyToken.message);
  const removeRecipe = RecipesModel.remove(id);
  return removeRecipe;
};

const putImage = async (token, id, image) => {
  if (!token) throw validateError(401, 'missing auth token');
  const validVerifyToken = await verifyToken(token);
  if (validVerifyToken.message) throw validateError(401, validVerifyToken.message);
  const updatedRecipe = await RecipesModel.putImage(id, image);
  return updatedRecipe;
};

module.exports = {
  registerRecipe,
  listAllRecipes,
  findById,
  update,
  remove,
  putImage,
};