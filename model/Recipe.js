const { ObjectId } = require('mongodb');
const connection = require('./connection');

const formatRecipe = ({ name, ingredients, preparation, userId, _id }) => ({ name,
  ingredients,
  preparation,
  userId,
  _id });

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const createNew = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  const result = createNew.ops[0];
  return formatRecipe(result);
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes.map(formatRecipe);
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipeId = ObjectId(id);
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: recipeId });
  return formatRecipe(recipe);
};

const edit = async (id, name, ingredients, preparation) => {
  const idEdit = ObjectId(id);
  const db = await connection();
  await db.collection('recipes')
    .updateOne({ _id: idEdit }, { $set: { name, ingredients, preparation } });
  return findById(id);
};

module.exports = { create, getAll, findById, edit };