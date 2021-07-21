const { ObjectId } = require('mongodb');
const connection = require('./connection');

const userRegisterModel = async (userData) => {
  const db = await connection();
  const collection = await db.collection('users');
  const result = await collection.insertOne(userData);
  const { name, email, role, _id } = result.ops[0];
  return {
    user: {
      name,
      email,
      role,
      _id,
    },
  };
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

const createRecipeModel = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const collection = await db.collection('recipes');
  const result = await collection.insertOne({ name, ingredients, preparation, userId });
  return { recipe: result.ops[0] };
};

const getAllRecipes = async () => {
  const db = await connection();
  const collection = await db.collection('recipes');
  const result = await collection.find({}).toArray();
  return result;
};

const getOneRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const collection = await db.collection('recipes');
  const result = await collection.findOne({ _id: ObjectId(id) });
  return result;
};

const editOneRecipe = async (id, recipeObject, userId) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const collection = await db.collection('recipes');
  await collection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: recipeObject },
    { returnOriginal: false },
  );
  return { ...recipeObject, _id: id, userId };
};

const deleteOneRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const collection = await db.collection('recipes');
  await collection.deleteOne({ _id: ObjectId(id) });
};

const upload = async (id, path) => {
  const db = await connection();
  const collection = await db.collection('recipes');
  const result = await collection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/${path}` } },
    { returnOriginal: false },
  );
  return result.value;
};

module.exports = {
  userRegisterModel,
  findEmail,
  validadeLogin,
  createRecipeModel,
  getAllRecipes,
  getOneRecipe,
  editOneRecipe,
  deleteOneRecipe,
  upload,
};
