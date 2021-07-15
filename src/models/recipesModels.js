const connection = require('./connection');

const insertRecipe = async (recipeInfo) => {
  const result = await connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipeInfo }));

  return result.insertedId;
};

const postNewRecipe = async (recipeInfo) => {
  const result = await insertRecipe(recipeInfo);

  return result;
};

module.exports = {
  postNewRecipe,
};