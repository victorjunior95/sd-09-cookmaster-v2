const conn = require('./connection');
const response = require('../helpers/response');

const postRecipe = async (name, ingredients, preparation, userId) => {
  const recipesCollection = await conn()
    .then((db) => db.collection('recipes'));

  const { insertedId } = await recipesCollection
    .insertOne({ name, ingredients, preparation, userId });
  
  if (!insertedId) return response(500, 'Internal server error');
  return {
    status: 201,
    recipe: {
      name, 
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
  };
};

const getAll = async () => {
  const recipesCollection = await conn()
    .then((db) => db.collection('recipes'));

  const result = await recipesCollection.find({}).toArray();

  return result;
};

module.exports = {
  postRecipe,
  getAll,
};
