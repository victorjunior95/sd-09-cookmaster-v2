const recipesModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const model = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return model;
};

const getAll = async () => {
  const model = await recipesModel.getAll();
  return model;
};

const findById = async (id) => {
  const model = await recipesModel.findById(id);
  return model;
};

const updateOne = async (id, name, ingredients, preparation) => {
  const model = await recipesModel.updateOne(id, name, ingredients, preparation);
  return model;
};

const deleteRecipe = async (id) => {
  const model = await recipesModel.deleteRecipe(id);
  return model;
};

const addImage = async (id, image) => {
  const model = await recipesModel.addImage(id, image);
  return model;
};

module.exports = {
  createRecipe,
  getAll,
  findById,
  updateOne,
  deleteRecipe,
  addImage,
};