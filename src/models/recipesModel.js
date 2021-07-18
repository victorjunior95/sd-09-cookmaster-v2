const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (recipe) => {
  const db = await connection();
  const collection = await db.collection('recipes');

  const newRecipe = await collection.insertOne(
    recipe,
  );
  return newRecipe.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const collection = await db.collection('recipes');
  const recipes = await collection.find({}).toArray();
  return recipes;
};

const getOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const collection = await db.collection('recipes');
  const recipe = await collection.findOne({ _id: ObjectId(id) });
  return recipe;
};

const update = async (id, recipe) => {
  const db = await connection();
  const collection = await db.collection('recipes');
  const newRecipe = await collection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: recipe },
    { returnOriginal: false },
  );
  return newRecipe.value;
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
};
