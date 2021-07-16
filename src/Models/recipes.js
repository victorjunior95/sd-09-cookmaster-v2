const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => connection()
    .then((db) => db
      .collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result.ops[0]);

const listAllRecipes = async () => connection()
    .then((db) => db.collection('recipes').find().toArray());

const findRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

  return result;
};

const updateRecipe = async ({ _id, name, ingredients, preparation }) => connection()
  .then((db) => db.collection('recipes').findOneAndUpdate(
      { _id },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
  ))
  .then((result) => result.value);

module.exports = {
  createRecipe,
  listAllRecipes,
  findRecipeById,
  updateRecipe,
};
