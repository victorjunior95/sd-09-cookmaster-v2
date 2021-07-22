const connection = require('../connection/connection');

const registerRecipe = async (recipe) => {
  const newRecipe = await connection()
  .then((db) => db.collection('recipes').insertOne(recipe));
  return {
    name: newRecipe.ops[0].name,
    ingredients: newRecipe.ops[0].ingredients,
    preparation: newRecipe.ops[0].preparation,
    _id: newRecipe.insertedId,
    // userId,
  };
};

module.exports = { registerRecipe };