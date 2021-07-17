const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((recipe) => ({ name, ingredients, preparation, userId, _id: recipe.insertedId }));

const getAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((recipes) => (recipes));

module.exports = {
  createRecipes,
  getAllRecipes,
};