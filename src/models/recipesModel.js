const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipe) => {
  const newRecipe = await connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipe }));
  return newRecipe.ops[0];
};

const getAllRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  return connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
