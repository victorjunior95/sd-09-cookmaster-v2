const { ObjectId } = require('mongodb');
const connection = require('./connectionMongoDb');
const getRecipeById = require('./getRecipeById');

module.exports = async (recipeId, urlImage) => {
  if (!ObjectId.isValid(recipeId)) return null;

  const result = await getRecipeById(recipeId);

  if (!result) return null;

  await connection()
    .then((db) => db.collection('recipes')
    .updateOne({ _id: new ObjectId(recipeId) }, { $set: { image: urlImage } }));

  return result;
};
