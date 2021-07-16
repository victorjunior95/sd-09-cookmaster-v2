const connection = require('./connection');

const create = async (userId, name, ingredients, preparation) => {
  const usersCollection = await connection()
  .then((db) => db.collection('recipes'));

  const { ops } = await usersCollection.insertOne({ userId, name, ingredients, preparation });

  return ops[0];
};

module.exports = {
  create,
};