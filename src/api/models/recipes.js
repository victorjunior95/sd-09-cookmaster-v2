const connection = require('./connection');

const create = async (recipe) => 
  connection().then((db) => db
    .collection('recipes')
      .insertOne(recipe)
      .then(({ ops }) => ops[0]));

module.exports = { create };