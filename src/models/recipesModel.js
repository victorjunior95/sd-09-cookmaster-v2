const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createRecipe = (recipe) => connection()
  .then((db) => db.collection('recipes')
  .insertOne(recipe)
  .then(({ ops }) => ops[0]));

const recipesList = () => connection()
  .then((db) => db.collection('recipes')
  .find()
  .toArray());

const getRecipeById = (id) => connection()
.then((db) => db.collection('recipes')
.findOne(ObjectID(id)));

const updateRecipe = (id, recipe) => connection()
  .then((db) => db.collection('recipes')
  .updateOne({ _id: ObjectID(id) }, { $set: recipe }));

module.exports = { createRecipe, recipesList, getRecipeById, updateRecipe };
