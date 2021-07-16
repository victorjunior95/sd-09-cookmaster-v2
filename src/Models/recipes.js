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

const uploadRecipeImage = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const recipeId = new ObjectId(id);
  const result = await connection() 
    .then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: recipeId },
      { $set: { image: `localhost:3000/src/uploads/${id}.png` } },
      { returnOriginal: false },
    )).then((res) => res.value);

  return result;
};

const deleteRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipeId = new ObjectId(id);
  const result = await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: recipeId }));

  return result;
};

module.exports = {
  createRecipe,
  listAllRecipes,
  findRecipeById,
  updateRecipe,
  deleteRecipeById,
  uploadRecipeImage,
};
