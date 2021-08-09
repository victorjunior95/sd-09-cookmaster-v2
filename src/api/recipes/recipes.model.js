const connection = require('../connection');

const addRecipe = async (newRecipe) => {
  const db = await connection();

  const { ops } = await db.collection('recipes').insertOne(newRecipe);

  return ops[0];
};

const listRecipes = async () => {
  const db = await connection();

  const recipesList = await db.collection('recipes').find().toArray();

  return recipesList;
};

module.exports = {
  addRecipe,
  listRecipes,
};
