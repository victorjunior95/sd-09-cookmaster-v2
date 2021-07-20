const { ObjectId } = require('mongodb');
const connection = require('./connection');

const userRegisterModel = async (userData) => {
  const db = await connection();
  const collection = await db.collection('users');
  const result = await collection.insertOne({ role: 'user', ...userData });
  return result;
};

const findEmail = async (email) => {
  const db = await connection();
  const collection = await db.collection('users');
  const result = await collection.findOne({ email });
  return result;
};

const validadeLogin = async (email, password) => {
  const db = await connection();
  const collection = await db.collection('users');
  const result = await collection.findOne({ email, password });
  return result;
};

const createRecipeModel = async (name, ingredients, preparation) => {
  const db = await connection();
  const collection = await db.collection('recipes');
  const result = await collection.insertOne({ name, ingredients, preparation });
  return { recipe: result.ops[0] };
};

const getAllRecipes = async () => {
  const db = await connection();
  const collection = await db.collection('recipes');
  const result = await collection.find({ }).toArray();
  return result;
};

const getOneRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const collection = await db.collection('recipes');
  const result = await collection.findOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  userRegisterModel,
  findEmail,
  validadeLogin,
  createRecipeModel,
  getAllRecipes,
  getOneRecipe,
};