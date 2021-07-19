const connection = require('./connection');

const recipeCreate = async (name, ingredients, preparation, userId) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
  return recipe.ops[0];
};

module.exports = {
  recipeCreate,
};