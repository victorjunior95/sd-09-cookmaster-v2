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
module.exports = { create, listAll };