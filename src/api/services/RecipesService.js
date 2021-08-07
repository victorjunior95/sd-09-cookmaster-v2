const recipes = require('../models/recipes');
const validate = require('../utils/validators');

const create = async (recipeInfo, user) => {
  try {
    await validate.recipe(recipeInfo);
  } catch (error) {
    return error;
  }
  const { _id: userId } = user;
  const response = await recipes.create(recipeInfo, userId);
  return {
    status: 201,
    recipe: response,
  };
};

const getAll = async () => {
  const response = await recipes.getAll();
  return {
    status: 200,
    recipesList: response,
  };
};

const getById = async (id) => {
  try {
    await validate.recipeId(id);
  } catch (error) {
    return error;
  }
  const { _id, name, ingredients, preparation } = await recipes.getById(id);
  return {
    status: 200,
    _id,
    name, 
    ingredients,
    preparation,
  };
};

const update = async (id, recipe, user) => {
  const { _id: userId } = user;
  await recipes.update(id, { ...recipe, userId });
  return {
    status: 200,
    userId,
  };
};

const putImage = (id, path) => 
  recipes.putImage(id, `localhost:3000/${path}`)
    .then(() => recipes.getById(id)
    .then((data) => ({ status: 200, data })));

const remove = (id) => recipes.remove(id).then(() => ({ status: 204 }));

module.exports = { create, getAll, getById, update, remove, putImage };