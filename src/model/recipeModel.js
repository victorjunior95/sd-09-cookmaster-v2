const { ObjectId } = require('mongodb');
const connection = require('./connection');
const Errors = require('../errors');

const create = async (userId, name, ingredients, preparation) => {
  const recipesCollection = await connection()
  .then((db) => db.collection('recipes'));

  const { ops } = await recipesCollection.insertOne({ userId, name, ingredients, preparation });

  return ops[0];
};

const findAll = async () => {
  const recipesCollection = await connection()
  .then((db) => db.collection('recipes'));

  const recipesList = await recipesCollection.find().toArray();

  return recipesList;
};

const findById = async (id) => {
  const recipesCollection = await connection()
  .then((db) => db.collection('recipes'));

  if (!ObjectId.isValid(id)) throw new Errors.RecipeNotFoundError();
  
  const recipe = await recipesCollection.findOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  create,
  findAll,
  findById,
};