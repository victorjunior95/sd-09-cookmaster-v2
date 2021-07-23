const { ObjectId } = require('mongodb');
const connection = require('./connection');

const maxValue = 24;

const create = async (name, ingredients, preparation, userId) => {
  const recipeCreated = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  return recipeCreated.ops[0];
};

const showAll = async () => {
  const list = await connection()
    .then((db) => db.collection('recipes').find({}).toArray());

  return list;
};

const findId = async (id) => {
  if (id.length !== maxValue) return null;

  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: new ObjectId(id) }));
  
  return recipe;
};

module.exports = {
  create,
  showAll,
  findId,
};