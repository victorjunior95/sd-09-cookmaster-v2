const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

const registerRecipe = async (newRecipe) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').insertOne(newRecipe)).then(({ ops }) => ops[0]);
  return recipe;
};

const findRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const findRecipeById = async (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

module.exports = { registerRecipe, findRecipes, findRecipeById };
