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
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const recipeById = await connection().then((db) => 
    db.collection(collectionRecipes).findOne(new ObjectId(id)));
    return recipeById;
};

const update = async (id, name, ingredients, preparation) => {
  const recipeId = new ObjectId(id);
  const updateRecipe = await connection()
    .then(
      (db) =>
        db.collection(collectionRecipes).findOneAndUpdate({ _id: recipeId },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false }),
    )
    .then((result) => result.value);
  return updateRecipe;
}; 

const exclude = async (id) => {
  const recipeId = new ObjectId(id);
  const updateRecipe = await connection()
    .then(
      (db) =>
        db.collection(collectionRecipes).findOneAndDelete({ _id: recipeId }),
    );
  return updateRecipe;
}; 

module.exports = { create, listAll, getRecipeById, update, exclude };