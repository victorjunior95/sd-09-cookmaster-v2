const { ObjectId } = require('mongodb');
const connection = require('./connection');

const coll = 'recipes';

const add = async (name, ingredients, preparation, userId) => {
  const response = await connection().then((db) =>
    db.collection(coll).insertOne({ name, ingredients, preparation, userId }));

  const [recipe] = response.ops;

  return recipe;
};
const getAll = async () => {
  const recipes = await connection()
    .then((db) => db.collection(coll).find().toArray());

  return recipes;
};

const getById = async (id) => {
  try {
    const recipe = await connection()
    .then((db) => db.collection(coll).findOne({ _id: new ObjectId(id) }));

    return recipe;
  } catch (error) {
    return null;
  }
};

module.exports = {
  add,
  getAll,
  getById,
};