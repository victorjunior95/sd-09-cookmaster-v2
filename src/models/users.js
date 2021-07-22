// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const user = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
    return user.ops[0];
};

const findByEmail = async (email) => {
  const db = await connection();
  const user = db.collection('users').findOne({ email });
  return user;
};

const findByPassword = async (password) => {
  const db = await connection();
  const user = db.collection('users').findOne({ password });
  return user;
};

module.exports = {
 createUser,
  findByEmail,
  findByPassword,
};
