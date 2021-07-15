// recipesModel
const connection = require('./connection');

const addRecipe = async (recipeObject) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').insertOne(recipeObject));
  return recipe.ops[0];
};

module.exports = {
  addRecipe,
};