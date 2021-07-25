const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
    // console.log(newRecipe);
    return newRecipe.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  return db.collection('recipes').findOne({ _id: ObjectId(id) });
};

// getAll().then((r) => console.log(r));

module.exports = {
  create,
  getAll,
  getById,
};
