const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const recipeCreated = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

  return recipeCreated.ops[0];
};

const showAll = async () => {
  const list = await connection()
    .then((db) => db.collection('recipes').find({}).toArray());
    
  return list;
};

module.exports = {
  create,
  showAll,
};