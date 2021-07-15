const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (user) => {
  const db = await connection();
  const result = await db.collection('users').insertOne(user);
  const { password, ...withoutPassword } = result.ops[0];
  return { user: withoutPassword };
};

const findByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

module.exports = {
  create,
  findByEmail,
};