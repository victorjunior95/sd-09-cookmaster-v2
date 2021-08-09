const connection = require('../connection');

const addUser = async (newUser) => {
  const db = await connection();

  const { ops } = await db.collection('users').insertOne(newUser);

  return ops[0];
};

const getUserByEmail = async (email) => {
  const db = await connection();

  const user = await db.collection('users').findOne({ email });

  return user;
};

module.exports = {
  addUser,
  getUserByEmail,
};
