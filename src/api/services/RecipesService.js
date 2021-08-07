const Model = require('../models/RecipesModel');
const validate = require('../utils/validators');

const create = async (recipeInfo, user) => {
  try {
    await validate.recipe(recipeInfo);
  } catch (error) {
    return error;
  }
  const { _id: userId } = user;
  const response = await Model.create(recipeInfo, userId);
  return {
    status: 201,
    recipe: response,
  };
};

const getAll = async () => {
  const response = await Model.getAll();
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
  const { _id, name, ingredients, preparation } = await Model.getById(id);
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
  await Model.update(id, { ...recipe, userId });
  return {
    status: 200,
    userId,
  };
};

const putImage = (id, path) => 
Model.putImage(id, `localhost:3000/${path}`)
    .then(() => Model.getById(id)
    .then((data) => ({ status: 200, data })));

const remove = (id) => Model.remove(id).then(() => ({ status: 204 }));

module.exports = { create, getAll, getById, update, remove, putImage };