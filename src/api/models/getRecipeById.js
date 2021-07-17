const { ObjectId } = require('mongodb');
const connection = require('./connectionMongoDb');
 
module.exports = async (recipeId) => {
  if (!ObjectId.isValid(recipeId)) return null;

  const result = await connection()
    .then((db) => db.collection('recipes')
    .findOne({ _id: new ObjectId(recipeId) }));

  return result;
};
