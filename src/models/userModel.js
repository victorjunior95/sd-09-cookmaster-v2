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

module.exports = {
  createUser,
  findUserByEmail,
};
