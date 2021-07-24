const { ObjectID } = require('mongodb');
const connection = require('../connect');

const addRecipe = async (recipe) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne(recipe);
  return { _id: result.insertedId, ...recipe };
};

const findRecipes = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const findRecipe = async (id) => {
  const db = await connection();
  const result = await db.collection('recipes').find({ _id: ObjectID(id) }).toArray();
  return result;
};

const updateRecipe = async (id, { name, ingredients, preparation, userId }) => {
  const db = await connection();
  await db.collection('recipes')
    .updateOne(
      { _id: ObjectID(id) },
      { $set: { name, ingredients, preparation, userId } },
    );
  return { _id: id, name, ingredients, preparation, userId };
};

const removeRecipe = async (id) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectID(id) });
  return null;
};

module.exports = {
  addRecipe,
  findRecipes,
  findRecipe,
  updateRecipe,
  removeRecipe,
};