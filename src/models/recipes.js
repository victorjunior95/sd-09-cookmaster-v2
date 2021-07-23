const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection()
  .then((db) => 
    db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
return { name, ingredients, preparation, userId, _id: newRecipe.insertedId };
};

const getAllRecipes = async () => {
  const getRecipes = await connection()
  .then((db) => 
    db.collection('recipes')
      .find().toArray());
  return getRecipes;
};

const getOneRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const getRecipe = await connection()
    .then((db) =>
      db.collection('recipes')
        .findOne({ _id: ObjectId(id) }));
  return getRecipe;
};

module.exports = { 
  create,
  getAllRecipes,
  getOneRecipe,
 };