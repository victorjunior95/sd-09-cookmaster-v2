const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  if (!newRecipe) return null;
  return newRecipe;
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = db.collection('recipes').find().toArray();
  if (!recipes) return null;
  return recipes;
};

module.exports = {
  createRecipe,
  getRecipes,
};