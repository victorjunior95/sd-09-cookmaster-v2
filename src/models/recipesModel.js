const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionRecipes = 'recipes';

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection().then((db) =>
    db.collection(collectionRecipes).insertOne({ name, ingredients, preparation, userId }));
  return newRecipe.ops[0];
};

const listAll = async () => {
  const recipesAll = await connection().then((db) =>
    db.collection(collectionRecipes).find().toArray());
  return recipesAll;
};

const getRecipeById = async (id) => {
  const recipeById = await connection().then((db) => 
    db.collection(collectionRecipes).findOne(new ObjectId(id)));
    return recipeById;
};

module.exports = { create, listAll, getRecipeById };