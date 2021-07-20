const { ObjectId } = require('mongodb');
const model = require('../model');
const response = require('../helpers/response');

const postRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return response(400, 'Invalid entries. Try again.');

  const {
    status,
    recipe,
    message,
  } = await model.recipes.postRecipe(name, ingredients, preparation, userId);

  return {
    status,
    recipe,
    message,
  };
};

const getAll = async () => {
  const result = await model.recipes.getAll();

  return result;
};

const getById = async (id) => {
  const recipe = await model.recipes.getById(id);

  if (!recipe) return response(404, 'recipe not found');

  return {
    status: 200,
    recipe,
  };
};

const updateRecipe = async (id, body, user) => {
  const { name, ingredients, preparation } = body;

  const { userId } = await model.recipes.getById(id);
  const objectUserId = new ObjectId(userId);

  const { _id, role } = user;
  const reqId = new ObjectId(_id);
  
  if (objectUserId.equals(reqId) || role === 'admin') {
    const recipe = await model.recipes.updateRecipe(id, name, ingredients, preparation);
    if (!recipe) return response(400, 'recipe not found');
    return {
      status: 200,
      recipe,
    };
  }
  return response(401, 'access denied');
};

module.exports = {
  postRecipe,
  getAll,
  getById,
  updateRecipe,
};
