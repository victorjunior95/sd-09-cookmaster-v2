const connection = require('./connection');

const create = async ({ name, preparation, ingredients, userId }) => {
  const recipesCollection = await connection()
    .then((db) => db.collection('recipes'));
  const { insertedId } = await recipesCollection
  .insertOne({ name, preparation, ingredients, userId });

  return {
    id: insertedId,
  };
};

module.exports = {
    create,
  }; 