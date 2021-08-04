const Recipe = require('../model/Recipe');

const create = async (name, ingredients, preparation, user) => {
  const { _id } = user;
  const userId = _id;
  const newRecipe = await Recipe.create(name, ingredients, preparation, userId);
  return { recipe: newRecipe };
};

const getAll = async () => Recipe.getAll();

const findById = async (id) => Recipe.findById(id);

const edit = async (id, params, user) => {
  const { name, ingredients, preparation } = params;
  const toEdit = await findById(id);
  const { _id, role } = user;
  const idUser = _id.toString();
  if (!toEdit) return { error: { status: 404, message: 'Recipe not found' } };
  console.log(`toEdit: ${toEdit}`);
  console.log(`toEdit.userId: ${toEdit.userId}`);
  console.log(`role: ${role}`);
  console.log(`idUser: ${idUser}`);
  const userId = toEdit.userId.toString();
  console.log(`ahiu: ${(userId === idUser)}`);
  if (userId === idUser || role === 'admin') {
    return Recipe.edit(id, name, ingredients, preparation);
  }
  return { error: { status: 401, message: 'You cant do it' } };
};

module.exports = { create, getAll, findById, edit };