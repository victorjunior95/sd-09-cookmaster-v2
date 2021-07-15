const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result.ops[0]);

const getAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipe = async (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectID(id)));

module.exports = {
  createRecipes,
  getAll,
  getRecipe,
};
