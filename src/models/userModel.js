const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createUser = async (newUser) => {
  const db = await connection();
  const result = await db.collection('users').insertOne(newUser);
  const { password, ...userWithOutPassword } = result.ops[0];
  return userWithOutPassword;
};

const findUserByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

const findUserById = async (id) => {
  if (!ObjectId(id)) return null;
  const db = await connection();
  const result = await db.collection('users').findOne(ObjectId(id));
  return result;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
