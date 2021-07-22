// const { ObjectId } = require('mongodb');
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
  console.log(getRecipes);
  return getRecipes;
};

module.exports = { 
  create,
  getAllRecipes,
 };