const { ObjectId } = require('mongodb'); 
const connection = require('./connectionMongoDb');

module.exports = async (recipeId, recipeData) => {
  if (!ObjectId.isValid(recipeId)) return null;

  const result = await connection()
    .then((db) => db.collection('recipes')
    .updateOne(
      { _id: new ObjectId(recipeId) }, 
      { $set: {
        name: recipeData.name,
        ingredients: recipeData.ingredients,
        preparation: recipeData.preparation } },
    ));

  return result;
};
