const connection = require('./connections');

const recipesRegistration = async ({ name, ingredients, preparation }, userId) => {
  const newRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  const { insertedId: _id } = newRecipe;
  return { recipe: { name, ingredients, preparation, userId, _id } };
};

const getRecipesModels = async () => {
  const result = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return result;
};

module.exports = {
  recipesRegistration,
  getRecipesModels,
};
