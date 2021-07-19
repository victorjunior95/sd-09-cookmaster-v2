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

module.exports = {
  registerRecipes,
  listRecipes,
};
