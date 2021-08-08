const connection = require('./connection');

const COLLECTION = 'recipes';

const addRecipe = async (recipeData) => {
  const recipeCollection = await connection().then((db) => db.collection(COLLECTION));

  const { insertedId: _id } = await recipeCollection.insertOne({ ...recipeData });

  return { recipe: { _id, ...recipeData } };
};

module.exports = {
  addRecipe,
};
