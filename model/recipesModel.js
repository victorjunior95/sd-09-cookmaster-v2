const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

const registerRecipe = async (newRecipe) => connection()
    .then((db) => db.collection('recipes').insertOne(newRecipe)).then(({ ops }) => ops[0]);

const findRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const findRecipeById = async (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const updateRecipe = async (id, { name, ingredients, preparation }) => connection()
.then((db) => db.collection('recipes').updateOne(
  { _id: ObjectId(id) },
  { $set: { name, ingredients, preparation } },
  { upsert: false },
  ));

module.exports = { registerRecipe, findRecipes, findRecipeById, updateRecipe };
