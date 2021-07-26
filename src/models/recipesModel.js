// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertRecipe = async (recipe) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ ...recipe }))
    .then((res) => res.ops[0]);

  return result;
};

const allRecipes = async () => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .find({}).toArray());

  return result;
};

module.exports = {
  allRecipes,
  insertRecipe,
};
