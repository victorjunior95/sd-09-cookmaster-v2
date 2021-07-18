const connection = require('./connection');

const create = async (recipe) => {
  const db = await connection();
  const collection = await db.collection('recipes');

  const newRecipe = await collection.insertOne(
    recipe,
  );
  return newRecipe.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const collection = await db.collection('recipes');
  const recipes = await collection.find({}).toArray();
  return recipes;
};

module.exports = {
  create,
  getAll,
};
