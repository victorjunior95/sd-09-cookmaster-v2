const recipesModel = require('../models/recipesModel');

const add = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.add(
    name,
    ingredients,
    preparation,
    userId,
  );

  return { recipe };
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();

  return recipes;
};

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);

  if (!recipe) return null;

  return recipe;
};

const update = async (id, infoToBeUpdated, userData) => {
  const recipe = await recipesModel.update(id, infoToBeUpdated, userData);

  return recipe;
};

const remove = async (id, userData) => {
  await recipesModel.remove(id, userData);
};

const upload = async (id, filename, userData) => {
  const recipe = await recipesModel.upload(id, filename, userData);

  return recipe;
};

const getImageByRecipeId = async (id) => {
  const recipe = await recipesModel.getById(id);
  
  if (!recipe) return null;
  
  return recipe.image;
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
  upload,
  getImageByRecipeId,
};
