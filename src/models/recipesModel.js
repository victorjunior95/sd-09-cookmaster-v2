const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerRecipes = async (name, ingredients, preparation, userId) => {
  const newRecipes = await connection()
    .then((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }));
  // console.log('recipeModel', newRecipes.ops[0]);
  return newRecipes.ops[0];
};

const listRecipes = async () => {
  const listRecipe = await connection()
  .then((db) => db.collection('recipes')
  .find().toArray());
  // console.log('listRecipe bd', listRecipe);
  return listRecipe;
};

const recipesId = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connection()
    .then((db) => db.collection('recipes')
    .findOne(new ObjectId(id)));

    console.log('model', recipe);
  return recipe;
};

module.exports = {
  registerRecipes,
  listRecipes,
  recipesId,
};
