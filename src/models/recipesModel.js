const connection = require('./connections');

const recipesRegistration = async ({ name, ingredients, preparation }, userId) => {
  const newRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation }));
  const { insertedId: _id } = newRecipe;
  return { recipe: { name, ingredients, preparation, userId, _id } };
};

module.exports = {
  recipesRegistration,
};
