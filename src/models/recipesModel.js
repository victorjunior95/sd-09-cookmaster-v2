const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerRecipe = async (recipe) => {
  return connection()
    .then((db) => db.collection('recipes').insertOne(recipe))
    .then((result) => result.ops[0]);
};

const getAllRecipes = async () => {
  return connection().then((db) => db.collection('recipes').find({}).toArray());
};

const getRecipeById = async (id) => {
  return connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

const updateRecipeById = async (id, newInfos) => {
  return connection().
    then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: newInfos },
    ));
};

const deleteRecipeById = async (id) => {
  return connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
