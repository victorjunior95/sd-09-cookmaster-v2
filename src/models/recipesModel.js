const connection = require('./connections');

const createRecipe = async (recipe) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne(recipe));

  return { ...recipe, _id: insertedId };
};

module.exports = {
  createRecipe,
};
