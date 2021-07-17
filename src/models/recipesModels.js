const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((recipe) => ({ name, ingredients, preparation, userId, _id: recipe.insertedId }));

const getAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((recipes) => (recipes));

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .then((recipe) => (recipe));
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
};