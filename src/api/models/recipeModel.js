const connection = require('./connection');

const createRecipe = async ({ name, preparation, ingredients }) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes'));
  const { insertedId } = await recipe
  .insertOne({ name, preparation, ingredients, url: 'url' });

  return {
    id: insertedId,
  };
};

module.exports = {
  createRecipe,
};