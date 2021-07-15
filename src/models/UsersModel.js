const connection = require('./connection');

const listAllUsers = async () => {
  const conn = await connection();
  const users = conn.collection('users').find().toArray();

  return users;
};

const findByEmail = async (email) => {
  const findResult = await connection()
  .then((db) => db.collection('users').findOne({ email }));
  if (!findResult) return null;
  return findResult.email;
};

const registerUser = async (userData) => {
  const insertResponse = await connection()
  .then((db) => db.collection('users').insertOne(userData))
  .catch((err) => console.error(err));
  return insertResponse;
};

module.exports = {
  listAllUsers,
  registerUser,
  findByEmail,
}; 