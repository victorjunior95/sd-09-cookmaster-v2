const { ObjectId } = require('mongodb');
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

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipesCollection = await conn()
  .then((db) => db.collection('recipes'));

  const recipe = await recipesCollection
    .findOne({ _id: new ObjectId(id) });

  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;

  const newData = { name, ingredients, preparation };

  const recipesCollection = await conn()
  .then((db) => db.collection('recipes'));

  const recipe = await recipesCollection
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: newData }, { returnOriginal: false });

  return recipe.value;
};

module.exports = {
  postRecipe,
  getAll,
  getById,
  updateRecipe,
};
