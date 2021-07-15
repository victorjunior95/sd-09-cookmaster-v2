const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerRecipe = async (recipe) => (
  connection()
    .then((db) => db.collection('recipes').insertOne(recipe))
    .then((result) => result.ops[0])
);

const getAllRecipes = async () => (
  connection().then((db) => db.collection('recipes').find({}).toArray())
);

const getRecipeById = async (id) => (
  connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }))
);

const updateRecipeById = async (id, newInfos) => (
  connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: newInfos },
    ))
);

const deleteRecipeById = async (id) => (
  connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }))
);

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
