const connection = require('./connectionMongoDb');

module.exports = async (recipeData) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
    .insertOne(recipeData));
  
  return result.ops[0];
};
