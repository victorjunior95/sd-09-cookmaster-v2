const { ObjectId } = require('mongodb');
const connection = require('./connection');

const recipesCollection = 'recipes';

const postNewRecipe = async ({ name, ingredients, preparation }) => {
  const data = await connection().then((db) =>
    db.collection(recipesCollection).insertOne({
      name,
      ingredients,
      preparation,
    }));
  return data;
};

const getAllRecipes = async () => {
  const data = await connection().then((db) => 
    db.collection(recipesCollection).find({}).toArray());
  return data;
};

const getRecipeById = async (id) => {
  const data = await connection().then((db) =>
    db.collection(recipesCollection).findOne(ObjectId(id)));
  return data;
};

module.exports = { postNewRecipe, getAllRecipes, getRecipeById };