const connection = require('./connection');

const create = async (userId, name, ingredients, preparation) => {
  const recipesCollection = await connection()
  .then((db) => db.collection('recipes'));

  const { ops } = await recipesCollection.insertOne({ userId, name, ingredients, preparation });

  return ops[0];
};

const findAll = async () => {
  const recipesCollection = await connection()
  .then((db) => db.collection('recipes'));

  const recipesList = await recipesCollection.find().toArray();
  
  return recipesList;
};

module.exports = {
  create,
  findAll,
};