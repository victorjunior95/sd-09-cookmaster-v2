const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipes = await connection().then((db) =>
    db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
  return recipes.ops[0];
};

module.exports = {
  createRecipe,
};
