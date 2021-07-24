const connection = require('../connect');

const addUser = async (user) => {
  const db = await connection();
  const result = await db.collection('users').insertOne(user);
  const newUser = { _id: result.insertedId, ...user };
  delete newUser.password;
  return newUser;
};

const getUserField = async (field, value) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ [field]: value });
  return result;
};

module.exports = {
  addUser,
  getUserField,
};
