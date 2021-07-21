const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
const result = await connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return result;
};
    
module.exports = {
  createRecipe,
};