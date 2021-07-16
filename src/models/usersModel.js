// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (userInfo) => {
  const db = await connection();
  const collection = await db.collection('users');
  const newUser = await collection.insertOne({
      role: 'user',
      ...userInfo,
  });
  const user = newUser.ops[0];
  delete user.password;
  return {
    user: {
      ...user,
    },
  };
};

const login = async (email, password) => {
  const db = await connection();
  const collection = await db.collection('users');
  const user = await collection.findOne(
    { email, password },
  );
  return user;
};

const findEmail = async (email) => {
  const db = await connection();
  const collection = await db.collection('users');
  const user = await collection.findOne({ email });
  return user;
};

module.exports = {
  create,
  findEmail,
  login,
};
