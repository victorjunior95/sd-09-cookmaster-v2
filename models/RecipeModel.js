const connection = require('./connection');

const create = async (name, ingredients, preparation) => {
  const newRecipe = await connection()
  .then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
  }));

  return newRecipe.ops[0];
};

module.exports = {
  create,
};