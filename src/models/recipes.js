const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, id) => connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, id }))
    .then((result) => result.ops[0]);

const getAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

module.exports = {
  createRecipes,
  getAll,
};
