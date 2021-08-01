const connection = require('./connections');

const newRecipeModel = async (recipe) => connection()
  .then((db) => db.collection('recipes').insertOne(recipe))
  .then((result) => result.ops[0]);

module.exports = {
  newRecipeModel,
};
