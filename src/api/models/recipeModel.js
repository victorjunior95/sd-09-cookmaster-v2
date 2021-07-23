const connection = require('./connection');

const createRecipe = async ({ name, preparation, ingredients }) => {
  const usersCollection = await connection()
    .then((db) => db.collection('recipes'));
  const { insertedId } = await usersCollection
  .insertOne({ name, preparation, ingredients, url: 'url' });

  return {
    id: insertedId,
  };
};

module.exports = {
  createRecipe,
};