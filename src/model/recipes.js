const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipe) => {
  const conn = await connection();
  const recipes = await conn.collection('recipe')
    .insertOne(recipe);
  return recipes.ops[0];
};

const listAllRecipes = async () => {
  const conn = await connection();
  const listRecipes = await conn.collection('recipe')
    .find().toArray();
  return listRecipes;
};

const findById = async (id) => {
  const conn = await connection();
  if (!ObjectId.isValid(id)) return null;

  const result = await conn.collection('recipe')
    .findOne({ _id: new ObjectId(id) });

  return result;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const conn = await connection();

  if (!ObjectId.isValid(id)) return null;

  const data = await conn.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  return data;
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