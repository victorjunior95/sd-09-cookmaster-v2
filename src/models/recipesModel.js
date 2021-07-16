const connection = require('./connection');

const create = async (recipe) => {
  const db = await connection();
  const collection = await db.collection('recipes');

  const newRecipe = await collection.insertOne(
    recipe,
  );
  return newRecipe.ops[0];
};

module.exports = {
  create,
};
