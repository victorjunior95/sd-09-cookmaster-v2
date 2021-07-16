const connection = require('./connection');

const createUser = async (user) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne(user);
  const { password, ...register } = newUser.ops[0];
  return { user: register };
};

const findEmail = async (email) => {
const db = await connection();
const response = await db.collection('users').findOne({ email });
return response;
};

module.exports = {
  createUser,
  findEmail,
};