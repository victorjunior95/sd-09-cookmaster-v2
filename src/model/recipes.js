const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation }, userId) => {
  const conn = await connection();
  const item = await conn.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return item.ops[0];
};

const listAllRecipes = async () => {
  const conn = await connection();
  const listRecipes = await conn.collection('recipes')
    .find().toArray();
  return listRecipes;
};

const findById = async (id) => {
  const conn = await connection();
  if (!ObjectId.isValid(id)) return null;

  const result = await conn.collection('recipes')
    .findOne({ _id: new ObjectId(id) });
  return result;
};

const updateRecipe = async (id, { name, ingredients, preparation }, userId, image) => {
  const conn = await connection();

  if (!ObjectId.isValid(id)) return null;

  await conn.collection('recipes')
    .updateOne({ _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId, image } });
};

const deleteRecipe = async (id) => {
  const conn = await connection();

  if (!ObjectId.isValid(id)) return null;

  const data = await conn.collection('recipes')
    .deleteOne({ _id: ObjectId(id) });
  return data;
};

module.exports = {
  createRecipe,
  listAllRecipes,
  findById,
  updateRecipe,
  deleteRecipe,
};