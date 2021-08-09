const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function newRecipe(name, ingredients, preparation, userId) {
  const db = await connection();
  const result = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return result.ops[0];
}

async function fetchRecipes() {
  const db = await connection();
  const result = await db.collection('recipes').find({}).toArray();
  return result;
}

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return result;
}

async function editRecipe(id, name, ingredients, preparation) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  );
  return result.value;
}

async function deleteRecipe(id) {
  const db = await connection();
  const result = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return result;
}

async function addImg(id, image) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image } },
    { returnOriginal: false },
  );
  return result.value;
}

module.exports = {
  newRecipe,
  fetchRecipes,
  getById,
  editRecipe,
  deleteRecipe,
  addImg,
};
