const connection = require('./connection');

const create = async ({ name, preparation, ingredients }) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));
  const { insertedId } = await recipesCollection
  .insertOne({ name, preparation, ingredients });

  return {
    id: insertedId,
  };
};

const getAll = async () => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));

  const recipes = await recipesCollection.find().toArray();

  return recipes;
};

module.exports = {
  create,
  getAll,
};