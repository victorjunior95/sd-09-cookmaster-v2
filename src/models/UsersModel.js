const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email, password, role) => {
  const db = await connection();
  const newUser = db.collection('users').insertOne({ name, email, password, role });
  return newUser;
};

const findUserByEmail = async (email) => {
  const db = await connection();
  const user = db.collection('users').findOne({ email });
  if (!user) return null;
  return user;
};

const findUserById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = db.collection('users').findOne(ObjectId(id));
  if (!recipe) return null;
  return recipe;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};