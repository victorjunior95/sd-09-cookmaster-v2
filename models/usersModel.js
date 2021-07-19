const connection = require('./connection');
// const { ObjectId } = require('mongodb');

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

module.exports = {
  userRegisterModel,
  findEmail,
  validadeLogin,
};