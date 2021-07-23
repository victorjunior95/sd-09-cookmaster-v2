const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

async function addRecipe(tokenData, name, ingredients, preparation) {
  const db = await connection();
  const { _id } = tokenData;
  const response = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId: _id,
  });
  return { recipe: response.ops[0] };
}

async function getRecipe() {
  const db = await connection();
  const response = await db.collection('recipes').find({}).toArray();
  return response;
}

async function getRecipeById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const response = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return response;
}

module.exports = {
  addRecipe,
  getRecipe,
  getRecipeById,
};
