const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();

  const newUser = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return newUser.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();

  const allUsers = await db.collection('recipes')
    .find().toArray();

  return allUsers;
};

const getRecipeById = async (id) => {
  try {
    const recipe = await connection().then((db) =>
      db.collection('recipes').findOne(new ObjectId(id)));

    if (!recipe) return null;

    return recipe;
  } catch (err) {
    return null;
  }
};

const editRecipe = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const updateRecipe = await db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );

      if (!updateRecipe) return null;

  return updateRecipe.value;
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const deletedProduct = await getRecipeById(id);
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return deletedProduct;
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteById,
};