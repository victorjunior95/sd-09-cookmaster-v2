const Recipe = require('../model/Recipe');

const create = async (name, ingredients, preparation, user) => {
  const { _id } = user;
  const userId = _id;
  const newRecipe = await Recipe.create(name, ingredients, preparation, userId);
  return { recipe: newRecipe };
};

const getAll = async () => Recipe.getAll();

const findById = async (id) => Recipe.findById(id);

const validateUser = async (user, id) => {
  const toEdit = await findById(id);
  const { _id, role } = user;
  const idUser = _id.toString();
  if (!toEdit) return { error: { status: 404, message: 'Recipe not found' } };
  const userId = toEdit.userId.toString();
  if (userId === idUser || role === 'admin') {
    return null;
  }
  return { error: { status: 401, message: 'You cant do it' } };
};

const edit = async (id, params, user) => {
  const { name, ingredients, preparation } = params;
  const invalidUser = await validateUser(user, id);
  if (invalidUser) return invalidUser;
  const edited = await Recipe.edit(id, name, ingredients, preparation);
  return edited;
};

const deleteOne = async (user, id) => {
  const invalidUser = await validateUser(user, id);
  if (invalidUser) return invalidUser;
  return Recipe.deleteOne(id);
};

const addImage = async (id, user) => {
  const invalidUser = await validateUser(user, id);
  if (invalidUser) return invalidUser;
  const recipe = await findById(id);
  const { _id: recipeId } = recipe;
  const imageName = `${recipeId}.jpeg`;
  return Recipe.addImage(id, imageName);
};

module.exports = { create, getAll, findById, edit, deleteOne, addImage };