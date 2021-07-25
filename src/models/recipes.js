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

const updateRecipe = async ({ id, name, ingredients, preparation, userId }) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const recipe = await db
    .collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
     { returnOriginal: false }).then((result) => result.value);
    console.log({ _id: id, name, ingredients, preparation, userId });
    return recipe;
  };

// getAll().then((r) => console.log(r));

module.exports = {
  create,
  getAll,
  getById,
  updateRecipe,
};
