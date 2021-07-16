const connection = require('./connection');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const response = await connection().then((db) =>
    db.collection('users').insertOne({ name, ingredients, preparation, userId }));

  const [recipe] = response.ops;

  return recipe;
};

module.exports = {
  addRecipe,
};