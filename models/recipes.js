const connection = require('./connection');

const getInsertedRecipe = (recipeInfos) => {
  const { _id, name, ingredients, preparation, userId } = recipeInfos;
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id,
    },
  };
};

const insertRecipe = async (newRecipe) => connection()
    .then((db) => db.collection('recipes').insertOne(newRecipe))
    .then((result) => getInsertedRecipe(
      {
        _id: result.insertedId,
        ...newRecipe,
      },
    ));

const getAllRecipes = async () => connection()
    .then((db) => db.collection('recipes').find().toArray());

module.exports = {
  insertRecipe,
  getAllRecipes,
};
