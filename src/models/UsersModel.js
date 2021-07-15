const connection = require('./connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const newUser = db.collection('users').insertOne({ name, email, password });
  return newUser;
};

const findUserByEmail = async (email) => {
  const db = await connection();
  const user = db.collection('users').findOne({ email });
  if (!user) return null;
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
};