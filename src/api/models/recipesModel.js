const connection = require('./connection');

const getAll = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes')
      .find({}));

  return recipes.toArray();
};

const create = async (name, ingredients, preparation, userId) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));

  return result.ops[0];
};

module.exports = {
  getAll,
  create,
};
