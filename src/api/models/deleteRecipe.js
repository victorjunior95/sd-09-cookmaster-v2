const { ObjectId } = require('mongodb');
const connection = require('./connectionMongoDb');

module.exports = (recipeId) => {
  if (!ObjectId.isValid(recipeId)) return null;

  return connection()
  .then((db) => db.collection('recipes')
  .deleteOne({ _id: new ObjectId(recipeId) }));
};
