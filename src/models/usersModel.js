const connection = require('./connection');

const users = 'users';

const addUser = async (name, email, role) => {
  const db = await connection();
  const response = await db.collection(users).insertOne({ name, email, role });
  return { user: response.ops[0] };
};

const findByEmail = async (email) => {
  const db = await connection();
  const response = await db.collection(users).find({ email }).toArray();
  return response;
};

module.exports = {
  addUser,
  findByEmail,
};
