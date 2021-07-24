const RecipeModel = require('../model/recipeModel');
const Errors = require('../errors');

const create = async ({ _id: userId }, name, ingredients, preparation) => {
  const created = await RecipeModel.create(userId, name, ingredients, preparation);
  return created;
};

const findAll = async () => {
  const recipesList = await RecipeModel.findAll();
  return recipesList;
};

const findById = async (id) => {
  const recipe = await RecipeModel.findById(id);
  if (!recipe) throw new Errors.RecipeNotFoundError();
  return recipe;
};

const update = async (id, { name, ingredients, preparation }) => {
  const recipe = await RecipeModel.findById(id);

  if (!recipe) throw new Errors.RecipeNotFoundError();

  const updated = await RecipeModel.update(id, name, ingredients, preparation);
  
  return updated;
};

const remove = async (id) => {
  const recipe = await RecipeModel.findById(id);

  if (!recipe) throw new Errors.RecipeNotFoundError();

  await RecipeModel.remove(id);
};

const uploadImage = async (id) => {
  const image = { image: `localhost:3000/src/uploads/${id}.jpeg` };

  const updated = await RecipeModel.uploadImage(id, image);

  return updated;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
  uploadImage,
};