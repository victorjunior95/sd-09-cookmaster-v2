const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerRecipe = (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne(
    { name, ingredients, preparation, userId },
    ))
  .then((result) => result.ops[0]);

const listRecipes = () => connection()
  .then((db) => db.collection('recipes')
  .find()
  .toArray());

const getRecibeById = (_id) => connection().then((db) => db.collection('recipes')
  .findOne(new ObjectId(_id)));

module.exports = {
  registerRecipe,
  listRecipes,
  getRecibeById,
};
