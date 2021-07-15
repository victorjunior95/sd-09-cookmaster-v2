const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, id) => connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, id }))
    .then((result) => result.ops[0]);

module.exports = {
  createRecipes,
};
